'use client';
import { useEffect, useRef, useCallback } from 'react';

export function useScrollReveal(threshold = 0.1, rootMarginBottom = 50) {
    const ref = useRef(null);

    const observe = useCallback(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold, rootMargin: `0px 0px -${rootMarginBottom}px 0px` }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMarginBottom]);

    useEffect(() => {
        return observe();
    }, [observe]);

    return ref;
}
