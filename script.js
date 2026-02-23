/* ========================================
   TYPING ANIMATION
   ======================================== */
const typingPhrases = [
    'AI Vibe Coder',
    'Full-Stack Developer',
    '끊임없이 배우는 개발자',
    'Building with AI ✨',
    'React & Node.js',
    'Vibe Coding Enthusiast'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('heroTyping');
const typingSpeed = 80;
const deletingSpeed = 40;
const pauseAfterType = 2000;
const pauseAfterDelete = 500;

function typeEffect() {
    const currentPhrase = typingPhrases[phraseIndex];

    if (!isDeleting) {
        typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseAfterType);
            return;
        }
        setTimeout(typeEffect, typingSpeed);
    } else {
        typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % typingPhrases.length;
            setTimeout(typeEffect, pauseAfterDelete);
            return;
        }
        setTimeout(typeEffect, deletingSpeed);
    }
}

// Start typing after page load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

/* ========================================
   SCROLL REVEAL (Intersection Observer)
   ======================================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ========================================
   NAVBAR SCROLL EFFECT
   ======================================== */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

/* ========================================
   NAVBAR ACTIVE LINK (Scroll Spy)
   ======================================== */
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },
    {
        threshold: 0.3,
        rootMargin: '-80px 0px 0px 0px'
    }
);

sections.forEach((section) => sectionObserver.observe(section));

/* ========================================
   MOBILE MENU TOGGLE
   ======================================== */
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinksContainer.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
    });
});

/* ========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ========================================
   PARALLAX GLOW EFFECT (subtle)
   ======================================== */
window.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.hero-glow');
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    glows.forEach((glow, i) => {
        const factor = i === 0 ? 1 : -1;
        glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});
