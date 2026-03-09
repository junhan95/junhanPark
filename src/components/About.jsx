'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './About.module.css';

export default function About() {
    const { t } = useLanguage();
    const titleRef = useScrollReveal();
    const textRef = useScrollReveal();
    const [showMore, setShowMore] = useState(false);

    return (
        <section className={`section ${styles.about}`} id="about" aria-labelledby="about-title">
            <div className="container">
                <h2 className="section-title reveal" ref={titleRef}>
                    <span className="section-title__accent">//</span>{' '}
                    <span id="about-title">{t('about.title')}</span>
                </h2>
                <div className={`${styles.aboutContent} reveal`} ref={textRef}>
                    <div className={styles.aboutDesc}>
                        <p className={styles.aboutIntro}>
                            {t('about.summary')}
                        </p>
                        <button
                            className={styles.moreBtn}
                            onClick={() => setShowMore(!showMore)}
                            aria-expanded={showMore}
                        >
                            {showMore ? t('about.less') : t('about.more')}
                            <span className={`${styles.moreBtnIcon} ${showMore ? styles.moreBtnIconOpen : ''}`}>▼</span>
                        </button>
                    </div>
                    <div className={styles.profileImage}>
                        <Image
                            src="/images/junhan_park.jpg"
                            alt="Junhan Park"
                            width={400}
                            height={400}
                        />
                    </div>
                </div>

                {showMore && (
                    <div className={styles.moreContent}>
                        {/* Core Expertise */}
                        <div className={styles.moreSection}>
                            <h3 className={styles.moreSectionTitle}>{t('about.expertise_title')}</h3>
                            <div className={styles.expertiseGrid}>
                                {t('about.expertise_items').map((item, i) => (
                                    <div key={i} className={styles.expertiseTag}>{item}</div>
                                ))}
                            </div>
                        </div>

                        {/* Career */}
                        <div className={styles.moreSection}>
                            <h3 className={styles.moreSectionTitle}>{t('about.career_title')}</h3>
                            <div className={styles.careerList}>
                                {t('about.career_items').map((item, i) => (
                                    <div key={i} className={styles.careerItem}>
                                        <div className={styles.careerHeader}>
                                            <strong>{item.company}</strong>
                                            <span className={styles.careerPeriod}>{item.period}</span>
                                        </div>
                                        <p className={styles.careerRole}>{item.role}</p>
                                        <p className={styles.careerDesc}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div className={styles.moreSection}>
                            <h3 className={styles.moreSectionTitle}>{t('about.education_title')}</h3>
                            {t('about.education_items').map((item, i) => (
                                <div key={i} className={styles.eduItem}>
                                    <strong>{item.degree}</strong>
                                    <p>{item.school} · {item.year}</p>
                                    {item.thesis && <p className={styles.thesis}>{item.thesis}</p>}
                                </div>
                            ))}
                        </div>

                        {/* Interests */}
                        <div className={styles.moreSection}>
                            <h3 className={styles.moreSectionTitle}>{t('about.interests_title')}</h3>
                            <ul className={styles.interestList}>
                                {t('about.interests_items').map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
