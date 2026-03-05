'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Blog.module.css';

export default function Blog() {
    const { t, lang } = useLanguage();
    const [posts, setPosts] = useState([]);
    const titleRef = useScrollReveal();
    const subtitleRef = useScrollReveal();

    useEffect(() => {
        fetch('/api/blogs')
            .then(r => r.json())
            .then(setPosts)
            .catch(() => setPosts([]));
    }, []);

    return (
        <section className={`section ${styles.blog}`} id="blog" aria-labelledby="blog-title">
            <div className="container">
                <h2 className="section-title reveal" ref={titleRef}>
                    <span className="section-title__accent">//</span>{' '}
                    <span id="blog-title">{t('blog.title')}</span>
                </h2>
                <p className="section-subtitle reveal" ref={subtitleRef}>{t('blog.subtitle')}</p>

                <div className={styles.grid}>
                    {posts.map((post, i) => (
                        <BlogCard key={post.id} post={post} lang={lang} delay={i} readLabel={t('blog.read_more')} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function BlogCard({ post, lang, delay, readLabel }) {
    const ref = useScrollReveal();
    const title = lang === 'ko' ? post.titleKo : post.titleEn;
    const desc = lang === 'ko' ? post.descKo : post.descEn;

    return (
        <a
            href={post.url}
            target={post.url !== '#' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`${styles.card} reveal ${delay > 0 ? `delay-${delay}` : ''}`}
            ref={ref}
        >
            <div className={styles.cardTop}>
                <span className={styles.emoji}>{post.emoji}</span>
                <span className={styles.tag}>{post.tag}</span>
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc}>{desc}</p>
            <div className={styles.cardFooter}>
                <time className={styles.date}>{post.date}</time>
                <span className={styles.readMore}>{readLabel} →</span>
            </div>
        </a>
    );
}
