'use client';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './About.module.css';

const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'HTML / CSS', 'Git / GitHub', 'AI / LLM', 'RAG', 'Vite', 'Firebase', 'SEO', 'GraphQL'];

export default function About() {
    const { t } = useLanguage();
    const titleRef = useScrollReveal();
    const textRef = useScrollReveal();
    const skillsRef = useScrollReveal(0.1, 150);

    return (
        <section className={`section ${styles.about}`} id="about" aria-labelledby="about-title">
            <div className="container">
                <h2 className="section-title reveal" ref={titleRef}>
                    <span className="section-title__accent">//</span>{' '}
                    <span id="about-title">{t('about.title')}</span>
                </h2>
                <div className={styles.aboutGrid}>
                    <div className={`${styles.aboutText} reveal`} ref={textRef}>
                        <p className={styles.aboutIntro}>
                            {t('about.intro_prefix')}
                            <span className="highlight">{t('about.intro_highlight')}</span>
                            {t('about.intro_suffix')}
                        </p>
                        <p>{t('about.desc')}</p>
                    </div>
                    <div className="reveal delay-1" ref={skillsRef}>
                        <h3 className={styles.skillsTitle}>{t('about.skills_title')}</h3>
                        <div className={styles.skillsGrid}>
                            {skills.map((skill) => (
                                <div key={skill} className={styles.skillTag}>{skill}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
