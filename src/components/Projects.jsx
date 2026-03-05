'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Projects.module.css';

const projectsData = [
    {
        title: 'WiseQuery',
        descKey: 'projects.wisequery_desc',
        image: '/images/wisequery.webp',
        alt: 'WiseQuery - AI 기반 지식 관리 플랫폼',
        url: 'https://wisequery.app/',
        tags: ['AI / RAG', 'React', 'Full-Stack'],
        category: ['ai', 'fullstack'],
    },
    {
        title: 'Quectel Antenna Search',
        descKey: 'projects.quectel_desc',
        image: '/images/quectel-antenna.webp',
        alt: 'Quectel Antenna Search - 퀵텔 안테나 검색',
        url: 'https://quectel-antenna.com/',
        tags: ['React', 'Search Engine', 'SEO'],
        category: ['web'],
    },
    {
        title: 'Pokédex',
        descKey: 'projects.pokedex_desc',
        image: '/images/pokedex.webp',
        alt: 'Pokédex - 포켓몬 도감',
        url: 'https://pokemon-drawing-book.com/',
        tags: ['React', 'GraphQL', 'PokéAPI'],
        category: ['web'],
    },
];

const filters = [
    { key: 'all', labelKey: 'projects.filter_all' },
    { key: 'ai', labelKey: 'projects.filter_ai' },
    { key: 'web', labelKey: 'projects.filter_web' },
    { key: 'fullstack', labelKey: 'projects.filter_fullstack' },
];

export default function Projects() {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState('all');
    const titleRef = useScrollReveal();
    const subtitleRef = useScrollReveal();
    const filterRef = useScrollReveal();

    const filteredProjects = activeFilter === 'all'
        ? projectsData
        : projectsData.filter((p) => p.category.includes(activeFilter));

    return (
        <section className={`section ${styles.projects}`} id="projects" aria-labelledby="projects-title">
            <div className="container">
                <h2 className="section-title reveal" ref={titleRef}>
                    <span className="section-title__accent">//</span>{' '}
                    <span id="projects-title">{t('projects.title')}</span>
                </h2>
                <p className="section-subtitle reveal" ref={subtitleRef}>{t('projects.subtitle')}</p>

                <div className={`${styles.filters} reveal`} ref={filterRef}>
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            className={`${styles.filterBtn} ${activeFilter === f.key ? styles.filterBtnActive : ''}`}
                            onClick={() => setActiveFilter(f.key)}
                        >
                            {t(f.labelKey)}
                        </button>
                    ))}
                </div>

                <div className={styles.projectsGrid}>
                    {filteredProjects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} delay={i} t={t} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, delay, t }) {
    const ref = useScrollReveal();

    return (
        <article
            className={`${styles.projectCard} reveal ${delay > 0 ? `delay-${delay}` : ''}`}
            ref={ref}
        >
            <div className={styles.imageWrapper}>
                <Image
                    src={project.image}
                    alt={project.alt}
                    width={640}
                    height={400}
                    className={styles.projectImage}
                    loading="lazy"
                />
                <div className={styles.overlay}>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                        <span>{t('projects.visit')}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                    </a>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.tags}>
                    {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.desc}>{t(project.descKey)}</p>
            </div>
        </article>
    );
}
