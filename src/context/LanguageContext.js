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
        'hero.tag': '엔지니어링 × 코딩 × AI',
        'hero.desc': '복잡한 기술적 문제를 풀어내는 것을 좋아합니다. RF 엔지니어로서의 경험과 AI 도구를 결합하여, 엔지니어링 자동화와 실용적인 도구 개발에 도전하고 있습니다. 이 블로그에서는 그 여정을 공유합니다.',
        'hero.highlights': [
            { icon: '📡', text: 'RF / EMC 엔지니어링' },
            { icon: '🤖', text: 'AI 도구 탐구' },
            { icon: '💻', text: '엔지니어링 자동화' },
            { icon: '✍️', text: '기술 블로그' },
        ],
        'hero.cta_about': '더 알아보기',
        'hero.cta_contact': '연락하기',
        'about.title': 'About Me',
        'about.summary': 'RF / EMC 엔지니어로서 잔향실(RVC), 자동차 EMC 시험, 안테나 시스템을 전문으로 합니다. 20년 이상의 RF 엔지니어링 경험을 바탕으로, 안테나 설계, EMC 측정 시스템, 자동차 시험 환경의 교차점에서 일하고 있습니다. 최근에는 RF 측정 워크플로우와 기술 데이터 분석을 위한 코딩 및 AI 도구를 탐구하고 있습니다.',
        'about.more': '더보기',
        'about.less': '접기',
        'about.expertise_title': '핵심 전문 분야',
        'about.expertise_items': ['잔향실(RVC) 설계 및 자동차 EMC 시험', 'EMC 측정 시스템 및 연구소 통합', '안테나 설계 및 RF 시뮬레이션 (HFSS, CST)', 'OTA 검증 (TRP / TIS)', 'SAR 측정 및 적합성 분석', '자동차 EMC 표준 (ISO 11451 / CISPR 25)', 'RF 측정 자동화 및 시스템 엔지니어링', '기술 영업 및 해외 엔지니어링 협업'],
        'about.career_title': '경력',
        'about.career_items': [
            { company: 'KTM Technology Co., Ltd.', role: '기술 영업 및 프로젝트 매니저 (EMC / RF 시스템)', period: '2018 – 현재', desc: 'EMC 시험 시스템 통합 및 RF 측정 솔루션. 자동차 EMC용 잔향실(RVC) 시스템 기획. 유럽 엔지니어링 팀과 한국 고객 간 기술 연락 담당.' },
            { company: 'HCT / HCTM', role: '안테나 팀 리더 / RF 엔지니어', period: '2011 – 2015', desc: '모바일 기기 안테나 개발 프로젝트 리드. 스마트폰용 메탈릭 안테나 아키텍처 개발.' },
            { company: 'FIHTK (Foxconn Group)', role: '안테나 전문가 – Nokia 프로젝트', period: '2009 – 2011', desc: '스마트폰 안테나 설계 및 최적화. 안테나 방사 효율 및 SAR 성능 개선.' },
            { company: 'EMW Co., Ltd.', role: '안테나 설계 엔지니어', period: '2005 – 2009', desc: 'GSM/CDMA/WCDMA 기기용 통합 안테나 개발. RF 시뮬레이션, 프로토타이핑, 양산 검증.' },
            { company: 'Kukdong Telecom', role: 'RF / 안테나 엔지니어', period: '2003 – 2005', desc: '위성, 기지국, 레이다 안테나 설계. RF 시뮬레이션 및 필드 검증.' },
        ],
        'about.education_title': '학력',
        'about.education_items': [
            { degree: '전자통신공학 석사', school: '단국대학교', year: '2004', thesis: '논문: 피드백 구조를 가진 광대역 원뿔형 모노폴 안테나의 분석 및 특성' },
            { degree: '전자공학 학사', school: '단국대학교', year: '2002', thesis: '' },
        ],
        'about.interests_title': '관심 분야',
        'about.interests_items': ['코딩을 통한 엔지니어링 자동화', 'RF 측정 및 EMC 분석에 AI 도구 적용', '엔지니어를 위한 실용적인 도구 개발'],
        'timeline.title': '이력',
        'timeline.items': [
            { company: 'KTM Technology Co., Ltd.', role: '기술 영업 및 프로젝트 매니저 (EMC / RF 시스템)', period: '2018 – 현재', desc: 'EMC 시험 시스템 통합 및 RF 측정 솔루션. 자동차 EMC용 잔향실(RVC) 시스템 기획. 유럽 엔지니어링 팀과 한국 고객 간 기술 연락 담당.' },
            { company: 'PIF (ORACSIL Brand)', role: '창업자 및 제품 개발자', period: '2018 – 2023', desc: '중국 ODM 제조업체를 통한 소비자 전자제품 개발. 공급망 관리, 제품 소싱, 온라인 커머스 운영.' },
            { company: 'HCT / HCTM', role: '안테나 팀 리더 / RF 엔지니어', period: '2011 – 2015', desc: '모바일 기기 안테나 개발 프로젝트 리드. 스마트폰용 메탈릭 안테나 아키텍처 개발.' },
            { company: 'FIHTK (Foxconn Group)', role: '안테나 전문가 – Nokia 프로젝트', period: '2009 – 2011', desc: '스마트폰 안테나 설계 및 최적화. 안테나 방사 효율 및 SAR 성능 개선.' },
            { company: 'EMW Co., Ltd.', role: '안테나 설계 엔지니어', period: '2005 – 2009', desc: 'GSM/CDMA/WCDMA 기기용 통합 안테나 개발. RF 시뮬레이션, 프로토타이핑, 양산 검증.' },
            { company: 'Kukdong Telecom', role: 'RF / 안테나 엔지니어', period: '2003 – 2005', desc: '위성, 기지국, 레이다 안테나 설계. RF 시뮬레이션 및 필드 검증.' },
        ],
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
        typing: ['RF 엔지니어', '안테나 전문가', 'AI Vibe Coder', '기술 블로거', '엔지니어링 자동화'],
    },
    en: {
        'nav.about': 'About',
        'nav.career': 'Career',
        'nav.projects': 'Projects',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'nav.skip': 'Skip to content',
        'hero.tag': 'Engineering × Coding × AI',
        'hero.desc': 'I love solving complex technical problems. Combining my RF engineering experience with AI tools, I explore engineering automation and build practical tools. This blog shares that journey.',
        'hero.highlights': [
            { icon: '📡', text: 'RF / EMC Engineering' },
            { icon: '🤖', text: 'AI Tools Explorer' },
            { icon: '💻', text: 'Engineering Automation' },
            { icon: '✍️', text: 'Tech Blog' },
        ],
        'hero.cta_about': 'Learn More',
        'hero.cta_contact': 'Get in Touch',
        'about.title': 'About Me',
        'about.summary': 'RF / EMC Engineer specializing in Reverberation Chambers (RVC), Automotive EMC testing, and Antenna Systems. With more than 20 years of experience in RF engineering, I work at the intersection of antenna design, EMC measurement systems, and automotive test environments. Recently exploring coding and AI tools for RF measurement workflows and technical data analysis.',
        'about.more': 'More',
        'about.less': 'Less',
        'about.expertise_title': 'Core Expertise',
        'about.expertise_items': ['RVC Design & Automotive EMC Testing', 'EMC Measurement Systems & Lab Integration', 'Antenna Design & RF Simulation (HFSS, CST)', 'OTA Validation (TRP / TIS)', 'SAR Measurement & Compliance', 'Automotive EMC Standards (ISO 11451 / CISPR 25)', 'RF Measurement Automation', 'Technical Sales & Cross-border Collaboration'],
        'about.career_title': 'Career',
        'about.career_items': [
            { company: 'KTM Technology Co., Ltd.', role: 'Technical Sales & Project Manager (EMC / RF Systems)', period: '2018 – Present', desc: 'EMC test system integration and RF measurement solutions. RVC system planning for automotive EMC. Technical liaison between European teams and Korean customers.' },
            { company: 'HCT / HCTM', role: 'Antenna Team Leader / RF Engineer', period: '2011 – 2015', desc: 'Led antenna development projects for mobile devices. Developed metallic antenna architecture for smartphones.' },
            { company: 'FIHTK (Foxconn Group)', role: 'Antenna Specialist – Nokia Projects', period: '2009 – 2011', desc: 'Designed and optimized smartphone antennas. Improved antenna radiation efficiency and SAR performance.' },
            { company: 'EMW Co., Ltd.', role: 'Antenna Design Engineer', period: '2005 – 2009', desc: 'Developed integrated antennas for GSM/CDMA/WCDMA devices. RF simulation, prototyping, and production validation.' },
            { company: 'Kukdong Telecom', role: 'RF / Antenna Engineer', period: '2003 – 2005', desc: 'Designed satellite, base-station, and radar antennas. RF simulations and field validation.' },
        ],
        'about.education_title': 'Education',
        'about.education_items': [
            { degree: 'M.Sc. Electronic & Communication Engineering', school: 'Dankook University', year: '2004', thesis: 'Thesis: Analysis and Characteristics of Broadband Conical Monopole Antenna with Feedback Structure' },
            { degree: 'B.Eng. Electronic Engineering', school: 'Dankook University', year: '2002', thesis: '' },
        ],
        'about.interests_title': 'Interests',
        'about.interests_items': ['Engineering automation through coding', 'Applying AI tools to RF measurement and EMC analysis', 'Building practical tools for engineers'],
        'timeline.title': 'Career',
        'timeline.items': [
            { company: 'KTM Technology Co., Ltd.', role: 'Technical Sales & Project Manager (EMC / RF Systems)', period: '2018 – Present', desc: 'EMC test system integration and RF measurement solutions. RVC system planning for automotive EMC. Technical liaison between European teams and Korean customers.' },
            { company: 'PIF (ORACSIL Brand)', role: 'Founder & Product Developer', period: '2018 – 2023', desc: 'Developed consumer electronics products through ODM manufacturers in China. Managed supply chain, product sourcing, and online commerce.' },
            { company: 'HCT / HCTM', role: 'Antenna Team Leader / RF Engineer', period: '2011 – 2015', desc: 'Led antenna development projects for mobile devices. Developed metallic antenna architecture for smartphones.' },
            { company: 'FIHTK (Foxconn Group)', role: 'Antenna Specialist – Nokia Projects', period: '2009 – 2011', desc: 'Designed and optimized smartphone antennas. Improved antenna radiation efficiency and SAR performance.' },
            { company: 'EMW Co., Ltd.', role: 'Antenna Design Engineer', period: '2005 – 2009', desc: 'Developed integrated antennas for GSM/CDMA/WCDMA devices. RF simulation, prototyping, and production validation.' },
            { company: 'Kukdong Telecom', role: 'RF / Antenna Engineer', period: '2003 – 2005', desc: 'Designed satellite, base-station, and radar antennas. RF simulations and field validation.' },
        ],
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
        typing: ['RF Engineer', 'Antenna Specialist', 'AI Vibe Coder', 'Tech Blogger', 'Engineering Automation'],
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
