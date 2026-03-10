'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <Link href="/admin" className={styles.footerLogo}>
                        <span className="highlight">&lt;</span>Junhan Park<span className="highlight"> /&gt;</span>
                    </Link>
                    <p className={styles.footerText}>{t('footer.text')}</p>
                    <p className={styles.footerCopy}>&copy; 2026 Junhan Park. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
