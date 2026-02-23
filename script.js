/* ========================================
   INTERNATIONALIZATION (i18n)
   ======================================== */
const translations = {
    ko: {
        'nav.about': 'About',
        'nav.career': '이력',
        'nav.projects': '프로젝트',
        'nav.contact': '연락처',
        'hero.greeting': '안녕하세요 👋 저는',
        'hero.desc': 'AI와 함께 코드를 작성하고, 아이디어를 현실로 만드는 것을 즐깁니다.<br>Vibe Coding으로 더 빠르고, 더 창의적인 개발을 추구합니다.',
        'hero.cta_projects': '프로젝트 보기',
        'hero.cta_contact': '연락하기',
        'about.title': 'About Me',
        'about.intro': '<span class="highlight">AI Vibe Coder</span>로서, 저는 인공지능 도구를 활용한 효율적이고 창의적인 개발 방식을 추구합니다.',
        'about.desc': '복잡한 기술적 문제를 해결하는 것을 좋아하며, 사용자 경험을 최우선으로 생각합니다. AI 코딩 어시스턴트와 함께 빠른 프로토타이핑부터 프로덕션 레벨의 애플리케이션까지 다양한 프로젝트를 진행하고 있습니다.',
        'about.skills_title': 'Tech Stack',
        'timeline.title': '이력',
        'timeline.role1': 'AI Vibe Coder & 풀스택 개발자',
        'timeline.desc1': 'AI 코딩 도구를 활용하여 다수의 웹 애플리케이션을 독립적으로 기획·개발·배포. WiseQuery, Quectel Antenna Search, Pokédex 등 실서비스 운영 중.',
        'timeline.role2': '웹 개발자',
        'timeline.desc2': 'React 기반 프론트엔드 개발 및 Node.js 백엔드 개발 경험. 사용자 중심의 UI/UX 설계와 성능 최적화에 집중.',
        'timeline.role3': '소프트웨어 엔지니어',
        'timeline.desc3': '소프트웨어 개발 및 시스템 설계 경험. 데이터 처리, API 개발 등 다양한 백엔드 기술 활용.',
        'projects.title': '프로젝트',
        'projects.subtitle': 'AI Vibe Coding으로 만든 프로젝트들',
        'projects.visit': '사이트 방문',
        'projects.wisequery_desc': 'AI 기반 지식 관리 플랫폼. 프로젝트별로 대화를 정리하고, 고급 RAG 기술로 전체 지식 베이스에서 시맨틱 검색을 통해 답변을 얻을 수 있습니다.',
        'projects.quectel_desc': '퀵텔 안테나 검색 엔진. 모델명, 주파수, 태그, 스펙 등 다양한 조건으로 328개 이상의 안테나 제품을 빠르게 검색할 수 있습니다.',
        'projects.pokedex_desc': '포켓몬 도감 웹앱. 1세대부터 9세대까지 모든 포켓몬을 검색하고, 능력치, 진화 체인, 타입별 필터 등 다양한 기능을 제공합니다.',
        'contact.title': '연락처',
        'contact.subtitle': '함께 작업하고 싶으시다면 언제든 연락 주세요!',
        'contact.linkedin_handle': '연결하기',
        'contact.email_handle': '연락하기',
        'footer.text': '💜 와 AI Vibe Coding으로 제작',
        // Typing phrases
        'typing': ['AI Vibe Coder', '풀스택 개발자', '끊임없이 배우는 개발자', 'Building with AI ✨', 'React & Node.js', 'Vibe Coding Enthusiast']
    },
    en: {
        'nav.about': 'About',
        'nav.career': 'Career',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        'hero.greeting': 'Hello 👋 I am',
        'hero.desc': 'I enjoy writing code with AI and turning ideas into reality.<br>Pursuing faster and more creative development with Vibe Coding.',
        'hero.cta_projects': 'View Projects',
        'hero.cta_contact': 'Get in Touch',
        'about.title': 'About Me',
        'about.intro': 'As an <span class="highlight">AI Vibe Coder</span>, I pursue efficient and creative development using artificial intelligence tools.',
        'about.desc': 'I love solving complex technical problems and prioritize user experience above all. Working with AI coding assistants, I build everything from rapid prototypes to production-level applications.',
        'about.skills_title': 'Tech Stack',
        'timeline.title': 'Career',
        'timeline.role1': 'AI Vibe Coder & Full-Stack Developer',
        'timeline.desc1': 'Independently planned, developed, and deployed multiple web applications using AI coding tools. Currently operating WiseQuery, Quectel Antenna Search, Pokédex, and more.',
        'timeline.role2': 'Web Developer',
        'timeline.desc2': 'Experience in React-based frontend and Node.js backend development. Focused on user-centric UI/UX design and performance optimization.',
        'timeline.role3': 'Software Engineer',
        'timeline.desc3': 'Experience in software development and system design. Utilized various backend technologies including data processing and API development.',
        'projects.title': 'Projects',
        'projects.subtitle': 'Projects built with AI Vibe Coding',
        'projects.visit': 'Visit Site',
        'projects.wisequery_desc': 'AI-powered knowledge management platform. Organize conversations by project and get answers from your entire knowledge base through advanced RAG-based semantic search.',
        'projects.quectel_desc': 'Quectel antenna search engine. Quickly search over 328 antenna products by model, frequency, tags, specifications, and various other criteria.',
        'projects.pokedex_desc': 'Pokédex web app. Search all Pokémon from Generation 1 to 9, with stats, evolution chains, type filters, and many more features.',
        'contact.title': 'Contact',
        'contact.subtitle': "Feel free to reach out if you'd like to work together!",
        'contact.linkedin_handle': 'Connect',
        'contact.email_handle': 'Contact me',
        'footer.text': 'Built with 💜 and AI Vibe Coding',
        // Typing phrases
        'typing': ['AI Vibe Coder', 'Full-Stack Developer', 'Lifelong Learner', 'Building with AI ✨', 'React & Node.js', 'Vibe Coding Enthusiast']
    }
};

let currentLang = localStorage.getItem('lang') || 'ko';

function applyTranslations(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });
    document.documentElement.lang = lang;
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update lang button label
    const langLabel = document.getElementById('langLabel');
    langLabel.textContent = lang === 'ko' ? 'EN' : 'KO';

    // Restart typing with new phrases
    resetTyping();
}

/* ========================================
   THEME TOGGLE (Dark / Light)
   ======================================== */
const themeToggle = document.getElementById('themeToggle');
let currentTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    localStorage.setItem('theme', theme);
}

// Initialize theme
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

/* ========================================
   LANGUAGE TOGGLE
   ======================================== */
const langToggle = document.getElementById('langToggle');

langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'ko' ? 'en' : 'ko';
    applyTranslations(newLang);
});

/* ========================================
   TYPING ANIMATION
   ======================================== */
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout = null;
const typingEl = document.getElementById('heroTyping');
const typingSpeed = 80;
const deletingSpeed = 40;
const pauseAfterType = 2000;
const pauseAfterDelete = 500;

function getTypingPhrases() {
    return translations[currentLang]['typing'];
}

function resetTyping() {
    clearTimeout(typingTimeout);
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typingEl.textContent = '';
    typingTimeout = setTimeout(typeEffect, 300);
}

function typeEffect() {
    const phrases = getTypingPhrases();
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
        typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            typingTimeout = setTimeout(typeEffect, pauseAfterType);
            return;
        }
        typingTimeout = setTimeout(typeEffect, typingSpeed);
    } else {
        typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingTimeout = setTimeout(typeEffect, pauseAfterDelete);
            return;
        }
        typingTimeout = setTimeout(typeEffect, deletingSpeed);
    }
}

// Start typing and apply translations on load
window.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLang);
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
   CURSOR GLOW — Mouse-following ambient light
   ======================================== */
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;
let isMouseOnPage = false;

document.addEventListener('mouseenter', () => {
    isMouseOnPage = true;
    cursorGlow.classList.add('active');
});

document.addEventListener('mouseleave', () => {
    isMouseOnPage = false;
    cursorGlow.classList.remove('active');
});

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMouseOnPage) {
        isMouseOnPage = true;
        cursorGlow.classList.add('active');
    }
});

// Smooth interpolation loop (lerp for fluid follow)
function animateGlow() {
    const speed = 0.08;
    glowX += (mouseX - glowX) * speed;
    glowY += (mouseY - glowY) * speed;

    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';

    requestAnimationFrame(animateGlow);
}

animateGlow();
