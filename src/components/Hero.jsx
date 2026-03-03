'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Hero.module.css';

export default function Hero() {
    const { t, getTypingPhrases, lang } = useLanguage();
    const [typedText, setTypedText] = useState('');
    const phraseIdxRef = useRef(0);
    const charIdxRef = useRef(0);
    const isDeletingRef = useRef(false);
    const timeoutRef = useRef(null);

    const typeEffect = useCallback(() => {
        const phrases = getTypingPhrases();
        const currentPhrase = phrases[phraseIdxRef.current];

        if (!isDeletingRef.current) {
            charIdxRef.current++;
            setTypedText(currentPhrase.substring(0, charIdxRef.current));

            if (charIdxRef.current === currentPhrase.length) {
                isDeletingRef.current = true;
                timeoutRef.current = setTimeout(typeEffect, 2000);
                return;
            }
            timeoutRef.current = setTimeout(typeEffect, 80);
        } else {
            charIdxRef.current--;
            setTypedText(currentPhrase.substring(0, charIdxRef.current));

            if (charIdxRef.current === 0) {
                isDeletingRef.current = false;
                phraseIdxRef.current = (phraseIdxRef.current + 1) % phrases.length;
                timeoutRef.current = setTimeout(typeEffect, 500);
                return;
            }
            timeoutRef.current = setTimeout(typeEffect, 40);
        }
    }, [getTypingPhrases]);

    useEffect(() => {
        phraseIdxRef.current = 0;
        charIdxRef.current = 0;
        isDeletingRef.current = false;
        setTypedText('');
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(typeEffect, 1000);
        return () => clearTimeout(timeoutRef.current);
    }, [lang, typeEffect]);

    const handleClick = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const descLines = t('hero.desc').split('\n');

    return (
        <section className={styles.hero} id="hero">
            <div className={styles.heroBgGrid}></div>
            <div className={`${styles.heroGlow} ${styles.heroGlow1}`}></div>
            <div className={`${styles.heroGlow} ${styles.heroGlow2}`}></div>

            <div className={styles.heroContent}>
                <p className={`${styles.heroGreeting} animate-fade-up`}>{t('hero.greeting')}</p>
                <h1 className={`${styles.heroName} animate-fade-up delay-1`}>Junhan Park</h1>

                <div className={`${styles.heroTypingWrapper} animate-fade-up delay-2`}>
                    <span className={styles.heroTypingPrefix}>&gt;&nbsp;</span>
                    <span>{typedText}</span>
                    <span className={styles.heroCursor}>|</span>
                </div>

                <p className={`${styles.heroDesc} animate-fade-up delay-3`}>
                    {descLines.map((line, i) => (
                        <span key={i}>{line}{i < descLines.length - 1 && <br />}</span>
                    ))}
                </p>

                <div className={`${styles.heroCta} animate-fade-up delay-4`}>
                    <a href="#projects" className="btn btn--primary" onClick={(e) => handleClick(e, '#projects')}>
                        <span>{t('hero.cta_projects')}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a href="#contact" className="btn btn--ghost" onClick={(e) => handleClick(e, '#contact')}>
                        <span>{t('hero.cta_contact')}</span>
                    </a>
                </div>
            </div>

            <div className={styles.heroScrollIndicator}>
                <div className={styles.scrollMouse}>
                    <div className={styles.scrollWheel}></div>
                </div>
                <span>Scroll down</span>
            </div>
        </section>
    );
}
