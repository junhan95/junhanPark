'use client';
import { useState, useEffect } from 'react';

export default function ScrollProgress() {
    const [scrollPercent, setScrollPercent] = useState(0);
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const currentScroll = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollPercent(docHeight > 0 ? (currentScroll / docHeight) * 100 : 0);
            setShowTop(currentScroll > 400);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            {/* Scroll Progress Bar */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '3px',
                    width: `${scrollPercent}%`,
                    background: 'var(--accent-gradient)',
                    zIndex: 9999,
                    transition: 'width 0.1s linear',
                    boxShadow: '0 0 10px var(--accent-glow)',
                }}
                aria-hidden="true"
            />

            {/* Back to Top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
                style={{
                    position: 'fixed',
                    bottom: '32px',
                    right: '32px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--accent-gradient)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px var(--accent-glow)',
                    opacity: showTop ? 1 : 0,
                    visibility: showTop ? 'visible' : 'hidden',
                    transform: showTop ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease',
                    zIndex: 999,
                }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>
        </>
    );
}
