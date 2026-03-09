'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Timeline.module.css';

const INITIAL_COUNT = 3;

export default function Timeline() {
    const { t } = useLanguage();
    const titleRef = useScrollReveal();
    const [showAll, setShowAll] = useState(false);

    const items = t('timeline.items');
    const visibleItems = showAll ? items : items.slice(0, INITIAL_COUNT);
    const hasMore = items.length > INITIAL_COUNT;

    return (
        <section className={`section ${styles.timelineSection}`} id="timeline" aria-labelledby="timeline-title">
            <div className="container">
                <h2 className="section-title reveal" ref={titleRef}>
                    <span className="section-title__accent">//</span>{' '}
                    <span id="timeline-title">{t('timeline.title')}</span>
                </h2>
                <div className={styles.timeline}>
                    {visibleItems.map((item, i) => (
                        <TimelineItem key={i} item={item} delay={i} />
                    ))}
                </div>
                {hasMore && (
                    <button
                        className={styles.moreBtn}
                        onClick={() => setShowAll(!showAll)}
                        aria-expanded={showAll}
                    >
                        {showAll ? t('about.less') : t('about.more')}
                        <span className={`${styles.moreBtnIcon} ${showAll ? styles.moreBtnIconOpen : ''}`}>▼</span>
                    </button>
                )}
            </div>
        </section>
    );
}

function TimelineItem({ item, delay }) {
    const ref = useScrollReveal();

    return (
        <div className={`${styles.timelineItem} reveal ${delay > 0 ? `delay-${delay}` : ''}`} ref={ref}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineCard}>
                <span className={styles.timelineDate}>{item.period}</span>
                <h3 className={styles.timelineRole}>{item.company}</h3>
                <p className={styles.timelineRoleTitle}>{item.role}</p>
                <p className={styles.timelineDesc}>{item.desc}</p>
            </div>
        </div>
    );
}
