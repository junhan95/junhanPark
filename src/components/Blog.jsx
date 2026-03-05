'use client';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Blog.module.css';

const blogPosts = [
    {
        titleKey: 'blog.post1_title',
        descKey: 'blog.post1_desc',
        date: '2025-03-01',
        tag: 'AI',
        url: '#',
        emoji: '🤖',
    },
    {
        titleKey: 'blog.post2_title',
        descKey: 'blog.post2_desc',
        date: '2025-02-15',
        tag: 'React',
        url: '#',
        emoji: '⚛️',
    },
    {
        titleKey: 'blog.post3_title',
        descKey: 'blog.post3_desc',
        date: '2025-01-28',
        tag: 'Vibe Coding',
        url: '#',
        emoji: '✨',
    },
];

export default function Blog() {
    const { t } = useLanguage();
    const titleRef = useScrollReveal();
    const subtitleRef = useScrollReveal();

    return (
        <section className={`section ${styles.blog}`} id="blog" aria-labelledby="blog-title">
            <div className="container">
                <h2 className="section-title reveal" ref={titleRef}>
                    <span className="section-title__accent">//</span>{' '}
                    <span id="blog-title">{t('blog.title')}</span>
                </h2>
                <p className="section-subtitle reveal" ref={subtitleRef}>{t('blog.subtitle')}</p>

                <div className={styles.grid}>
                    {blogPosts.map((post, i) => (
                        <BlogCard key={post.titleKey} post={post} delay={i} t={t} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function BlogCard({ post, delay, t }) {
    const ref = useScrollReveal();

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
            <h3 className={styles.cardTitle}>{t(post.titleKey)}</h3>
            <p className={styles.cardDesc}>{t(post.descKey)}</p>
            <div className={styles.cardFooter}>
                <time className={styles.date}>{post.date}</time>
                <span className={styles.readMore}>{t('blog.read_more')} →</span>
            </div>
        </a>
    );
}
