'use client';
import { useEffect, useRef } from 'react';

/* ────────────────────────────────────────────────
   Theme palettes
   ──────────────────────────────────────────────── */
const PALETTES = {
    dark: {
        bgTop: '#070812',
        bgBottom: '#000000',
        star: [255, 255, 255],
        starTint: [200, 215, 255],
        composite: 'lighter',
        nebulae: [
            { color: [255, 102, 102], alpha: 0.20 },
            { color: [51, 153, 255], alpha: 0.22 },
            { color: [150, 90, 255], alpha: 0.18 },
            { color: [255, 190, 90], alpha: 0.09 },
            { color: [40, 220, 200], alpha: 0.10 },
        ],
        shooting: [255, 255, 255],
    },
    light: {
        bgTop: '#f9fafe',
        bgBottom: '#e6eaf5',
        star: [40, 52, 110],
        starTint: [70, 90, 160],
        composite: 'source-over',
        nebulae: [
            { color: [255, 120, 120], alpha: 0.13 },
            { color: [80, 150, 255], alpha: 0.14 },
            { color: [160, 110, 255], alpha: 0.12 },
            { color: [255, 200, 120], alpha: 0.08 },
            { color: [80, 210, 200], alpha: 0.08 },
        ],
        shooting: [60, 80, 160],
    },
};

/* Star layers: far → near. Near stars are bigger, brighter, and move more. */
const LAYERS = [
    { density: 0.00028, size: [0.4, 1.1], alpha: [0.25, 0.6], drift: 4, parallax: 0.15 },
    { density: 0.00012, size: [0.9, 1.7], alpha: [0.45, 0.85], drift: 9, parallax: 0.35 },
    { density: 0.00004, size: [1.5, 2.6], alpha: [0.7, 1.0], drift: 16, parallax: 0.7 },
];

const rand = (a, b) => a + Math.random() * (b - a);

function getTheme() {
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

/* Pre-render a soft nebula blob to an offscreen canvas (once per theme). */
function makeNebulaSprite(color, alpha, size = 512) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const [r, gg, b] = color;
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, `rgba(${r},${gg},${b},${alpha})`);
    grad.addColorStop(0.35, `rgba(${r},${gg},${b},${alpha * 0.55})`);
    grad.addColorStop(0.7, `rgba(${r},${gg},${b},${alpha * 0.15})`);
    grad.addColorStop(1, `rgba(${r},${gg},${b},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    return c;
}

export default function SpaceBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let width = 0;
        let height = 0;
        let dpr = 1;
        let theme = getTheme();
        let palette = PALETTES[theme];

        let stars = [];       // [{ layer, x, y, r, a, phase, speed, vx, vy, tint }]
        let nebulae = [];     // [{ sprite, cx, cy, radius, orbit, angSpeed, phase, rot, rotSpeed, sx, sy }]
        let shooting = [];    // [{ x, y, vx, vy, life, max, len }]
        let nextShooting = 0;

        // Nebulae are soft, so render them at 1/4 resolution and upscale.
        const NEB_SCALE = 0.25;
        const nebCanvas = document.createElement('canvas');
        const nebCtx = nebCanvas.getContext('2d');
        const FRAME_MIN = 1000 / 30; // cap at ~30fps

        // Pointer / scroll parallax (eased)
        const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
        let scrollY = window.scrollY;

        let raf = 0;
        let last = 0;
        let elapsed = 0;
        let running = true;

        /* ── Builders ─────────────────────────────── */
        const buildStars = () => {
            stars = [];
            const area = width * height;
            LAYERS.forEach((L, li) => {
                const count = Math.max(20, Math.floor(area * L.density));
                for (let i = 0; i < count; i++) {
                    const ang = rand(0, Math.PI * 2);
                    stars.push({
                        layer: li,
                        x: rand(0, width),
                        y: rand(0, height),
                        r: rand(L.size[0], L.size[1]),
                        a: rand(L.alpha[0], L.alpha[1]),
                        phase: rand(0, Math.PI * 2),
                        speed: rand(0.6, 2.2),
                        vx: Math.cos(ang) * L.drift * rand(0.4, 1),
                        vy: Math.sin(ang) * L.drift * rand(0.4, 1) - L.drift * 0.3, // slight upward bias
                        tint: Math.random() < 0.18,
                    });
                }
            });
        };

        const buildNebulae = () => {
            const base = Math.max(width, height);
            nebulae = palette.nebulae.map((n, i) => ({
                sprite: makeNebulaSprite(n.color, n.alpha),
                cx: rand(0.1, 0.9),
                cy: rand(0.1, 0.9),
                radius: base * rand(0.45, 0.8),
                orbit: base * rand(0.04, 0.10),
                angSpeed: rand(0.03, 0.07) * (i % 2 ? 1 : -1),
                phase: rand(0, Math.PI * 2),
                rot: rand(0, Math.PI * 2),
                rotSpeed: rand(0.01, 0.03) * (i % 2 ? -1 : 1),
                sx: rand(0.8, 1.4),
                sy: rand(0.6, 1.1),
            }));
        };

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            nebCanvas.width = Math.max(1, Math.floor(width * NEB_SCALE));
            nebCanvas.height = Math.max(1, Math.floor(height * NEB_SCALE));
            buildStars();
            buildNebulae();
        };

        const spawnShooting = () => {
            const fromLeft = Math.random() < 0.5;
            const speed = rand(700, 1100);
            const ang = rand(0.35, 0.65);
            shooting.push({
                x: fromLeft ? rand(-100, width * 0.4) : rand(width * 0.6, width + 100),
                y: rand(-50, height * 0.4),
                vx: Math.cos(ang) * speed * (fromLeft ? 1 : -1),
                vy: Math.sin(ang) * speed,
                life: 0,
                max: rand(0.7, 1.3),
                len: rand(120, 220),
            });
        };

        /* ── Renderers ────────────────────────────── */
        const drawBackdrop = () => {
            const g = ctx.createLinearGradient(0, 0, 0, height);
            g.addColorStop(0, palette.bgTop);
            g.addColorStop(1, palette.bgBottom);
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        };

        const drawNebulae = (t) => {
            const g = nebCtx;
            g.setTransform(1, 0, 0, 1, 0, 0);
            g.clearRect(0, 0, nebCanvas.width, nebCanvas.height);
            g.save();
            g.scale(NEB_SCALE, NEB_SCALE);
            g.globalCompositeOperation = palette.composite;
            for (const n of nebulae) {
                const a = n.phase + t * n.angSpeed;
                const x = n.cx * width + Math.cos(a) * n.orbit + mouse.x * 0.02;
                const y = n.cy * height + Math.sin(a * 1.3) * n.orbit - scrollY * 0.06 + mouse.y * 0.02;
                const breathe = 1 + Math.sin(t * 0.25 + n.phase) * 0.08;
                g.save();
                g.translate(x, y);
                g.rotate(n.rot + t * n.rotSpeed);
                g.scale(n.sx * breathe, n.sy * breathe);
                const d = n.radius * 2;
                g.drawImage(n.sprite, -d / 2, -d / 2, d, d);
                g.restore();
            }
            g.restore();
            ctx.drawImage(nebCanvas, 0, 0, width, height);
        };

        const drawStars = (t, dt) => {
            const [sr, sg, sb] = palette.star;
            const [tr, tg, tb] = palette.starTint;
            for (const s of stars) {
                const L = LAYERS[s.layer];
                if (!reduceMotion) {
                    s.x += s.vx * dt;
                    s.y += s.vy * dt;
                    if (s.x < -4) s.x += width + 8; else if (s.x > width + 4) s.x -= width + 8;
                    if (s.y < -4) s.y += height + 8; else if (s.y > height + 4) s.y -= height + 8;
                }
                // Parallax offsets (mouse + scroll), wrapped
                let px = s.x + mouse.x * L.parallax * 0.06;
                let py = s.y - ((scrollY * L.parallax * 0.25) % (height + 8)) + mouse.y * L.parallax * 0.06;
                if (py < -4) py += height + 8;
                if (px < -4) px += width + 8; else if (px > width + 4) px -= width + 8;

                const tw = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(t * s.speed + s.phase);
                const alpha = s.a * tw;
                const [r, g, b] = s.tint ? [tr, tg, tb] : [sr, sg, sb];
                ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
                ctx.beginPath();
                ctx.arc(px, py, s.r, 0, Math.PI * 2);
                ctx.fill();

                // Soft glow on the nearest layer
                if (s.layer === 2 && alpha > 0.7) {
                    ctx.fillStyle = `rgba(${r},${g},${b},${(alpha - 0.7) * 0.35})`;
                    ctx.beginPath();
                    ctx.arc(px, py, s.r * 3.2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const drawShooting = (dt) => {
            const [r, g, b] = palette.shooting;
            ctx.save();
            ctx.lineCap = 'round';
            for (let i = shooting.length - 1; i >= 0; i--) {
                const s = shooting[i];
                s.life += dt;
                s.x += s.vx * dt;
                s.y += s.vy * dt;
                const p = s.life / s.max;
                if (p >= 1 || s.y > height + 200) { shooting.splice(i, 1); continue; }
                const fade = p < 0.2 ? p / 0.2 : 1 - (p - 0.2) / 0.8;
                const mag = Math.hypot(s.vx, s.vy);
                const tx = s.x - (s.vx / mag) * s.len;
                const ty = s.y - (s.vy / mag) * s.len;
                const grad = ctx.createLinearGradient(s.x, s.y, tx, ty);
                grad.addColorStop(0, `rgba(${r},${g},${b},${0.9 * fade})`);
                grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(tx, ty);
                ctx.stroke();
                // head
                ctx.fillStyle = `rgba(${r},${g},${b},${fade})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        };

        const frame = (now) => {
            if (!running) return;
            if (!last) last = now;
            if (now - last < FRAME_MIN) { raf = requestAnimationFrame(frame); return; }
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            elapsed += dt;

            // ease pointer
            mouse.x += (mouse.tx - mouse.x) * 0.05;
            mouse.y += (mouse.ty - mouse.y) * 0.05;

            drawBackdrop();
            drawNebulae(elapsed);
            drawStars(elapsed, dt);

            if (!reduceMotion) {
                nextShooting -= dt;
                if (nextShooting <= 0) {
                    spawnShooting();
                    nextShooting = rand(2.5, 7);
                }
                drawShooting(dt);
            }

            raf = requestAnimationFrame(frame);
        };

        const renderStatic = () => {
            drawBackdrop();
            drawNebulae(0);
            drawStars(0, 0);
        };

        /* ── Events ───────────────────────────────── */
        const onMouse = (e) => {
            mouse.tx = e.clientX - width / 2;
            mouse.ty = e.clientY - height / 2;
        };
        const onScroll = () => { scrollY = window.scrollY; };
        const onVisibility = () => {
            if (document.hidden) {
                running = false;
                cancelAnimationFrame(raf);
            } else if (!reduceMotion) {
                running = true;
                last = 0;
                raf = requestAnimationFrame(frame);
            }
        };

        const themeObserver = new MutationObserver(() => {
            const next = getTheme();
            if (next === theme) return;
            theme = next;
            palette = PALETTES[theme];
            buildNebulae();
            if (reduceMotion) renderStatic();
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouse, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('visibilitychange', onVisibility);

        if (reduceMotion) {
            renderStatic();
        } else {
            raf = requestAnimationFrame(frame);
        }

        return () => {
            running = false;
            cancelAnimationFrame(raf);
            themeObserver.disconnect();
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="spaceCanvas"
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                transform: 'translateZ(0)',
            }}
        />
    );
}
