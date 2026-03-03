'use client';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Timeline.module.css';

const timelineData = [
    { date: '2024 — Present', roleKey: 'timeline.role1', descKey: 'timeline.desc1' },
    { date: '2022 — 2024', roleKey: 'timeline.role2', descKey: 'timeline.desc2' },
    { date: '2020 — 2022', roleKey: 'timeline.role3', descKey: 'timeline.desc3' },
];

export default function Timeline() {
    const { t } = useLanguage();
    const titleRef = useScrollReveal();

    return (
        <section className={`section ${styles.timelineSection}`} id="timeline" aria-labelledby="timeline-title">
            <div className="container">
                <h2 className="section-title reveal" ref={titleRef}>
                    <span className="section-title__accent">//</span>{' '}
                    <span id="timeline-title">{t('timeline.title')}</span>
                </h2>
                <div className={styles.timeline}>
                    {timelineData.map((item, i) => (
                        <TimelineItem key={i} item={item} delay={i} t={t} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ item, delay, t }) {
    const ref = useScrollReveal();

    return (
        <div className={`${styles.timelineItem} reveal ${delay > 0 ? `delay-${delay}` : ''}`} ref={ref}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineCard}>
                <span className={styles.timelineDate}>{item.date}</span>
                <h3 className={styles.timelineRole}>{t(item.roleKey)}</h3>
                <p className={styles.timelineDesc}>{t(item.descKey)}</p>
            </div>
        </div>
    );
}
