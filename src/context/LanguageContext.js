'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
    ko: {
        'nav.about': 'About',
        'nav.career': '이력',
        'nav.projects': '프로젝트',
        'nav.blog': '블로그',
        'nav.contact': '연락처',
        'nav.skip': '본문 바로가기',
        'hero.greeting': '안녕하세요 👋 저는',
        'hero.desc': 'AI와 함께 코드를 작성하고, 아이디어를 현실로 만드는 것을 즐깁니다.\nVibe Coding으로 더 빠르고, 더 창의적인 개발을 추구합니다.',
        'hero.cta_projects': '프로젝트 보기',
        'hero.cta_contact': '연락하기',
        'about.title': 'About Me',
        'about.intro_prefix': '',
        'about.intro_highlight': 'AI Vibe Coder',
        'about.intro_suffix': '로서, 저는 인공지능 도구를 활용한 효율적이고 창의적인 개발 방식을 추구합니다.',
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
        'projects.filter_all': '전체',
        'projects.filter_ai': 'AI',
        'projects.filter_web': 'Web',
        'projects.filter_fullstack': 'Full-Stack',
        'blog.title': '블로그',
        'blog.subtitle': 'AI Vibe Coding과 개발 경험을 공유합니다',
        'blog.read_more': '읽기',
        'blog.post1_title': 'AI Vibe Coding이란 무엇인가?',
        'blog.post1_desc': 'AI 코딩 어시스턴트를 활용해 더 빠르고 창의적으로 개발하는 Vibe Coding 방법론을 소개합니다.',
        'blog.post2_title': 'React와 Next.js로 포트폴리오 만들기',
        'blog.post2_desc': 'Next.js App Router와 CSS 모듈을 활용해 퍼포먼스 최적화된 포트폴리오 사이트를 구축한 과정을 공유합니다.',
        'blog.post3_title': 'Vibe Coding으로 SaaS 런칭하기',
        'blog.post3_desc': 'AI 도구만으로 WiseQuery를 기획부터 배포까지 독립적으로 완성한 실제 경험을 담았습니다.',
        'contact.title': '연락처',
        'contact.subtitle': '함께 작업하고 싶으시다면 언제든 연락 주세요!',
        'contact.linkedin_handle': '연결하기',
        'contact.email_handle': '연락하기',
        'footer.text': '💜 와 AI Vibe Coding으로 제작',
        typing: ['AI Vibe Coder', '풀스택 개발자', '끊임없이 배우는 개발자', 'Building with AI ✨', 'React & Node.js', 'Vibe Coding Enthusiast'],
    },
    en: {
        'nav.about': 'About',
        'nav.career': 'Career',
        'nav.projects': 'Projects',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'nav.skip': 'Skip to content',
        'hero.greeting': 'Hello 👋 I am',
        'hero.desc': 'I enjoy writing code with AI and turning ideas into reality.\nPursuing faster and more creative development with Vibe Coding.',
        'hero.cta_projects': 'View Projects',
        'hero.cta_contact': 'Get in Touch',
        'about.title': 'About Me',
        'about.intro_prefix': 'As an ',
        'about.intro_highlight': 'AI Vibe Coder',
        'about.intro_suffix': ', I pursue efficient and creative development using artificial intelligence tools.',
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
        'projects.filter_all': 'All',
        'projects.filter_ai': 'AI',
        'projects.filter_web': 'Web',
        'projects.filter_fullstack': 'Full-Stack',
        'blog.title': 'Blog',
        'blog.subtitle': 'Sharing AI Vibe Coding insights and dev experiences',
        'blog.read_more': 'Read',
        'blog.post1_title': 'What is AI Vibe Coding?',
        'blog.post1_desc': 'An introduction to Vibe Coding — a methodology for faster and more creative development using AI coding assistants.',
        'blog.post2_title': 'Building a Portfolio with React & Next.js',
        'blog.post2_desc': 'How I built a performance-optimized portfolio using Next.js App Router and CSS Modules.',
        'blog.post3_title': 'Launching a SaaS with Vibe Coding',
        'blog.post3_desc': 'My real experience independently completing WiseQuery — from concept to deployment — using only AI tools.',
        'contact.title': 'Contact',
        'contact.subtitle': "Feel free to reach out if you'd like to work together!",
        'contact.linkedin_handle': 'Connect',
        'contact.email_handle': 'Contact me',
        'footer.text': 'Built with 💜 and AI Vibe Coding',
        typing: ['AI Vibe Coder', 'Full-Stack Developer', 'Lifelong Learner', 'Building with AI ✨', 'React & Node.js', 'Vibe Coding Enthusiast'],
    },
};

const defaultT = (key) => translations['ko']?.[key] || key;

const LanguageContext = createContext({
    lang: 'ko',
    toggleLang: () => { },
    t: defaultT,
    getTypingPhrases: () => translations['ko'].typing,
});

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('ko');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('lang') || 'ko';
        setLang(saved);
        setMounted(true);
    }, []);

    const toggleLang = () => {
        const newLang = lang === 'ko' ? 'en' : 'ko';
        setLang(newLang);
        localStorage.setItem('lang', newLang);
    };

    const t = (key) => {
        return translations[lang]?.[key] || translations['ko']?.[key] || key;
    };

    const getTypingPhrases = () => translations[lang]?.typing || translations['ko'].typing;

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t, getTypingPhrases }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
