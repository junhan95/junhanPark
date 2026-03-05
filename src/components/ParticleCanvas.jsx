'use client';
import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
    const lightRef = useRef(null);

    useEffect(() => {
        const el = lightRef.current;
        if (!el) return;

        const onMouseMove = (e) => {
            el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255, 102, 102, 0.12) 0%, transparent 70%)`;
        };

        document.addEventListener('mousemove', onMouseMove);
        return () => document.removeEventListener('mousemove', onMouseMove);
    }, []);

    return (
        <div
            ref={lightRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                transition: 'background 0.1s ease',
            }}
        />
    );
}
