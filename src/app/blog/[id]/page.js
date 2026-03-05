'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './post.module.css';

/* ── 간단한 마크다운 렌더러 ── */
function renderMarkdown(text) {
    if (!text) return [];
    const lines = text.split('\n');
    const elements = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // 코드 블록
        if (line.startsWith('```')) {
            const lang = line.slice(3).trim();
            const codeLines = [];
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            elements.push(<pre key={i} className={styles.codeBlock}><code data-lang={lang || 'code'}>{codeLines.join('\n')}</code></pre>);
            i++;
            continue;
        }

        // 제목 처리
        if (line.startsWith('### ')) {
            elements.push(<h3 key={i} className={styles.h3}>{inlineFormat(line.slice(4))}</h3>);
        } else if (line.startsWith('## ')) {
            elements.push(<h2 key={i} className={styles.h2}>{inlineFormat(line.slice(3))}</h2>);
        } else if (line.startsWith('# ')) {
            elements.push(<h1 key={i} className={styles.h1}>{inlineFormat(line.slice(2))}</h1>);
        }
        // 순서 있는 목록
        else if (/^\d+\. /.test(line)) {
            const listItems = [];
            while (i < lines.length && /^\d+\. /.test(lines[i])) {
                listItems.push(<li key={i}>{inlineFormat(lines[i].replace(/^\d+\. /, ''))}</li>);
                i++;
            }
            elements.push(<ol key={`ol-${i}`} className={styles.list}>{listItems}</ol>);
            continue;
        }
        // 순서 없는 목록
        else if (line.startsWith('- ')) {
            const listItems = [];
            while (i < lines.length && lines[i].startsWith('- ')) {
                listItems.push(<li key={i}>{inlineFormat(lines[i].slice(2))}</li>);
                i++;
            }
            elements.push(<ul key={`ul-${i}`} className={styles.list}>{listItems}</ul>);
            continue;
        }
        // 빈 줄
        else if (line.trim() === '') {
            // skip
        }
        // 일반 단락
        else {
            elements.push(<p key={i} className={styles.p}>{inlineFormat(line)}</p>);
        }
        i++;
    }
    return elements;
}

/* 인라인 포맷: **bold**, `code` */
function inlineFormat(text) {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={j}>{part.slice(2, -2)}</strong>;
        if (part.startsWith('`') && part.endsWith('`')) return <code key={j} className={styles.inlineCode}>{part.slice(1, -1)}</code>;
        return part;
    });
}

export default function BlogPost() {
    const { id } = useParams();
    const router = useRouter();
    const { lang, t } = useLanguage();
    const [post, setPost] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetch(`/api/blogs/${id}`)
            .then(r => { if (!r.ok) throw new Error(); return r.json(); })
            .then(setPost)
            .catch(() => setNotFound(true));
    }, [id]);

    if (notFound) return (
        <div className={styles.notFound}>
            <p>포스트를 찾을 수 없습니다.</p>
            <button onClick={() => router.back()}>← 돌아가기</button>
        </div>
    );

    if (!post) return <div className={styles.loading}><div className={styles.spinner} /></div>;

    const title = lang === 'ko' ? post.titleKo : post.titleEn;
    const content = lang === 'ko' ? post.contentKo : post.contentEn;

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                {/* 뒤로 가기 */}
                <button className={styles.backBtn} onClick={() => router.push('/#blog')}>
                    ← {lang === 'ko' ? '블로그 목록' : 'Back to Blog'}
                </button>

                {/* 헤더 */}
                <header className={styles.header}>
                    <div className={styles.meta}>
                        <span className={styles.tagChip}>{post.tag}</span>
                        <time className={styles.date}>{post.date}</time>
                    </div>
                    <div className={styles.emoji}>{post.emoji}</div>
                    <h1 className={styles.title}>{title}</h1>
                </header>

                {/* 본문 */}
                <article className={styles.content}>
                    {content ? renderMarkdown(content) : (
                        <p className={styles.p}>{lang === 'ko' ? post.descKo : post.descEn}</p>
                    )}
                </article>

                {/* 외부 링크 */}
                {post.url && post.url !== '#' && (
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                        {lang === 'ko' ? '관련 링크 방문 →' : 'Visit Link →'}
                    </a>
                )}
            </div>
        </div>
    );
}
