'use client';
import { useEffect, useRef } from 'react';

const PARTICLE_COLORS = [
    '#7c3aed', '#a855f7', '#2563eb', '#60a5fa', '#22d3ee',
    '#e53e3e', '#f56565', '#f6ad55', '#ecc94b', '#48bb78',
];
const SHAPES = ['circle', 'square', 'line'];
const MAX_PARTICLES = 300;

export default function ParticleCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const pool = new Array(MAX_PARTICLES);
        for (let i = 0; i < MAX_PARTICLES; i++) pool[i] = { active: false };

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        function initParticle(p, x, y) {
            p.x = x + (Math.random() - 0.5) * 20;
            p.y = y + (Math.random() - 0.5) * 20;
            p.vx = (Math.random() - 0.5) * 3;
            p.vy = (Math.random() - 0.5) * 3 - 1;
            p.gravity = 0.02 + Math.random() * 0.03;
            p.size = Math.random() * 4 + 2;
            p.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
            p.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
            p.rotation = Math.random() * Math.PI * 2;
            p.rotationSpeed = (Math.random() - 0.5) * 0.1;
            p.life = 1;
            p.decay = 0.005 + Math.random() * 0.008;
            p.active = true;
        }

        function spawnParticle(x, y) {
            for (let i = 0; i < MAX_PARTICLES; i++) {
                if (!pool[i].active) {
                    initParticle(pool[i], x, y);
                    return;
                }
            }
        }

        function onMouseMove(e) {
            const count = Math.floor(Math.random() * 2) + 2;
            for (let i = 0; i < count; i++) spawnParticle(e.clientX, e.clientY);
        }

        document.addEventListener('mousemove', onMouseMove);

        let animId;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < MAX_PARTICLES; i++) {
                const p = pool[i];
                if (!p.active) continue;

                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.vx *= 0.99;
                p.rotation += p.rotationSpeed;
                p.life -= p.decay;
                if (p.life <= 0) { p.active = false; continue; }

                ctx.save();
                ctx.globalAlpha = p.life;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.fillStyle = p.color;

                if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.shape === 'square') {
                    ctx.fillRect(-p.size, -p.size * 0.4, p.size * 2, p.size * 0.8);
                } else {
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = p.color;
                    ctx.beginPath();
                    ctx.moveTo(-p.size, 0);
                    ctx.lineTo(p.size, 0);
                    ctx.stroke();
                }
                ctx.restore();
            }

            animId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            document.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="particleCanvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
}
