'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { toggleTheme } = useTheme();
    const { lang, toggleLang, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.navContainer}>
                <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className={styles.navLogo}>
                    <span className={styles.logoBracket}>&lt;</span>JP<span className={styles.logoBracket}> /&gt;</span>
                </a>

                <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
                    <li><a href="#about" className={styles.navLink} onClick={(e) => handleNavClick(e, '#about')}>{t('nav.about')}</a></li>
                    <li><a href="#timeline" className={styles.navLink} onClick={(e) => handleNavClick(e, '#timeline')}>{t('nav.career')}</a></li>
                    <li><a href="#projects" className={styles.navLink} onClick={(e) => handleNavClick(e, '#projects')}>{t('nav.projects')}</a></li>
                    <li><a href="#blog" className={styles.navLink} onClick={(e) => handleNavClick(e, '#blog')}>{t('nav.blog')}</a></li>
                    <li><a href="#contact" className={styles.navLink} onClick={(e) => handleNavClick(e, '#contact')}>{t('nav.contact')}</a></li>
                </ul>

                <div className={styles.navActions}>
                    {/* Theme Toggle */}
                    <button className={styles.navIconBtn} onClick={toggleTheme} aria-label="Toggle theme">
                        <svg className={styles.iconSun} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                        </svg>
                        <svg className={styles.iconMoon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                        </svg>
                    </button>

                    {/* Language Toggle */}
                    <button className={`${styles.navIconBtn} ${styles.langBtn}`} onClick={toggleLang} aria-label="Toggle language">
                        <span>{lang === 'ko' ? 'EN' : 'KO'}</span>
                    </button>

                    {/* Mobile Menu */}
                    <button
                        className={`${styles.navToggle} ${menuOpen ? styles.navToggleActive : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
