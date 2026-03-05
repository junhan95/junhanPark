'use client';
import { useState, useEffect, useCallback } from 'react';
import styles from './admin.module.css';

const TOKEN_KEY = 'jp-admin-token';
const VALID_TOKEN = 'jp-admin-session';

export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (localStorage.getItem(TOKEN_KEY) === VALID_TOKEN) setAuthed(true);
        setChecking(false);
    }, []);

    if (checking) return null;
    return authed
        ? <Dashboard onLogout={() => { localStorage.removeItem(TOKEN_KEY); setAuthed(false); }} />
        : <LoginForm onSuccess={() => setAuthed(true)} />;
}

/* ── Login ── */
function LoginForm({ onSuccess }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, password: pw }),
        });
        if (res.ok) {
            const { token } = await res.json();
            localStorage.setItem(TOKEN_KEY, token);
            onSuccess();
        } else {
            setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
        setLoading(false);
    };

    return (
        <div className={styles.loginWrap}>
            <div className={styles.loginBox}>
                <div className={styles.loginLogo}>&lt;JP /&gt;</div>
                <h1 className={styles.loginTitle}>Admin Login</h1>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.field}>
                        <label>아이디</label>
                        <input value={id} onChange={e => setId(e.target.value)} placeholder="admin" required autoFocus />
                    </div>
                    <div className={styles.field}>
                        <label>비밀번호</label>
                        <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••" required />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.loginBtn} disabled={loading}>
                        {loading ? '로그인 중...' : '로그인'}
                    </button>
                </form>
            </div>
        </div>
    );
}

/* ── Dashboard ── */
function Dashboard({ onLogout }) {
    const [tab, setTab] = useState('blog');

    return (
        <div className={styles.adminWrap}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarLogo}>&lt;JP /&gt; Admin</div>
                <nav className={styles.sidebarNav}>
                    <button className={tab === 'blog' ? styles.navItemActive : styles.navItem} onClick={() => setTab('blog')}>
                        📝 블로그 관리
                    </button>
                    <button className={tab === 'content' ? styles.navItemActive : styles.navItem} onClick={() => setTab('content')}>
                        ✏️ 콘텐츠 편집
                    </button>
                </nav>
                <button className={styles.logoutBtn} onClick={onLogout}>로그아웃</button>
            </aside>
            <main className={styles.mainArea}>
                {tab === 'blog' ? <BlogManager /> : <ContentEditor />}
            </main>
        </div>
    );
}

/* ── Blog Manager ── */
function BlogManager() {
    const [posts, setPosts] = useState([]);
    const [editing, setEditing] = useState(null); // null | 'new' | post object
    const [toast, setToast] = useState('');

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

    const load = useCallback(async () => {
        const res = await fetch('/api/blogs');
        setPosts(await res.json());
    }, []);

    useEffect(() => { load(); }, [load]);

    const handleDelete = async (id) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        showToast('삭제되었습니다.');
        load();
    };

    return (
        <div className={styles.panel}>
            <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>블로그 관리</h2>
                {editing
                    ? <button className={styles.backBtn} onClick={() => setEditing(null)}>← 뒤로가기</button>
                    : <button className={styles.addBtn} onClick={() => setEditing('new')}>+ 새 포스트</button>
                }
            </div>
            {toast && <div className={styles.toast}>{toast}</div>}

            {editing && (
                <PostForm
                    initial={editing === 'new' ? null : editing}
                    onSave={async (data) => {
                        if (editing === 'new') {
                            await fetch('/api/blogs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
                            showToast('포스트가 생성되었습니다.');
                        } else {
                            await fetch(`/api/blogs/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
                            showToast('수정되었습니다.');
                        }
                        setEditing(null);
                        load();
                    }}
                    onCancel={() => setEditing(null)}
                />
            )}

            {!editing && (
                <div className={styles.postList}>
                    {posts.map(post => (
                        <div key={post.id} className={styles.postItem}>
                            <div className={styles.postMeta}>
                                <span className={styles.postEmoji}>{post.emoji}</span>
                                <div>
                                    <div className={styles.postTitle}>{post.titleKo}</div>
                                    <div className={styles.postDate}>{post.date} · {post.tag}</div>
                                </div>
                            </div>
                            <div className={styles.postActions}>
                                <button className={styles.editBtn} onClick={() => setEditing(post)}>편집</button>
                                <button className={styles.deleteBtn} onClick={() => handleDelete(post.id)}>삭제</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ── Post Form ── */
function PostForm({ initial, onSave, onCancel }) {
    const [form, setForm] = useState(initial || {
        titleKo: '', titleEn: '', descKo: '', descEn: '',
        contentKo: '', contentEn: '',
        date: new Date().toISOString().split('T')[0],
        tag: '', emoji: '📝', url: '#',
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <div className={styles.formCard}>
            <h3 className={styles.formTitle}>{initial ? '포스트 편집' : '새 포스트 작성'}</h3>
            <div className={styles.formGrid}>
                <label>제목 (한국어)<input value={form.titleKo} onChange={e => set('titleKo', e.target.value)} /></label>
                <label>Title (English)<input value={form.titleEn} onChange={e => set('titleEn', e.target.value)} /></label>
                <label className={styles.fullWidth}>설명 (한국어)<textarea rows={3} value={form.descKo} onChange={e => set('descKo', e.target.value)} /></label>
                <label className={styles.fullWidth}>Description (English)<textarea rows={3} value={form.descEn} onChange={e => set('descEn', e.target.value)} /></label>
                <label className={styles.fullWidth}>본문 (한국어) — Markdown 지원<textarea rows={10} value={form.contentKo} onChange={e => set('contentKo', e.target.value)} placeholder="## 제목&#10;&#10;내용을 작성하세요..." /></label>
                <label className={styles.fullWidth}>Content (English) — Markdown supported<textarea rows={10} value={form.contentEn} onChange={e => set('contentEn', e.target.value)} placeholder="## Heading&#10;&#10;Write content here..." /></label>
                <label>날짜<input type="date" value={form.date} onChange={e => set('date', e.target.value)} /></label>
                <label>태그<input value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="AI, React …" /></label>
                <label>이모지<input value={form.emoji} onChange={e => set('emoji', e.target.value)} /></label>
                <label>URL<input value={form.url} onChange={e => set('url', e.target.value)} placeholder="https://…" /></label>
            </div>
            <div className={styles.formActions}>
                <button className={styles.saveBtn} onClick={() => onSave(form)}>저장</button>
                <button className={styles.cancelBtn} onClick={onCancel}>취소</button>
            </div>
        </div>
    );
}

/* ── Content Editor ── */
function ContentEditor() {
    const [content, setContent] = useState(null);
    const [toast, setToast] = useState('');

    useEffect(() => {
        fetch('/api/content').then(r => r.json()).then(setContent);
    }, []);

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };
    const set = (section, key, val) => setContent(c => ({ ...c, [section]: { ...c[section], [key]: val } }));

    const handleSave = async () => {
        await fetch('/api/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) });
        showToast('저장되었습니다.');
    };

    if (!content) return <div className={styles.loading}>불러오는 중...</div>;

    return (
        <div className={styles.panel}>
            <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>콘텐츠 편집</h2>
                <button className={styles.addBtn} onClick={handleSave}>저장</button>
            </div>
            {toast && <div className={styles.toast}>{toast}</div>}

            <div className={styles.contentSection}>
                <h3 className={styles.sectionLabel}>🦸 Hero</h3>
                <div className={styles.formGrid}>
                    <label>소개 문구 (한국어)<input value={content.hero.greetingKo} onChange={e => set('hero', 'greetingKo', e.target.value)} /></label>
                    <label>Greeting (English)<input value={content.hero.greetingEn} onChange={e => set('hero', 'greetingEn', e.target.value)} /></label>
                    <label className={styles.fullWidth}>설명 (한국어)<textarea rows={3} value={content.hero.descKo} onChange={e => set('hero', 'descKo', e.target.value)} /></label>
                    <label className={styles.fullWidth}>Description (English)<textarea rows={3} value={content.hero.descEn} onChange={e => set('hero', 'descEn', e.target.value)} /></label>
                </div>
            </div>

            <div className={styles.contentSection}>
                <h3 className={styles.sectionLabel}>👤 About</h3>
                <div className={styles.formGrid}>
                    <label className={styles.fullWidth}>한 줄 소개 (한국어)<input value={content.about.introKo} onChange={e => set('about', 'introKo', e.target.value)} /></label>
                    <label className={styles.fullWidth}>Intro (English)<input value={content.about.introEn} onChange={e => set('about', 'introEn', e.target.value)} /></label>
                    <label className={styles.fullWidth}>상세 설명 (한국어)<textarea rows={4} value={content.about.descKo} onChange={e => set('about', 'descKo', e.target.value)} /></label>
                    <label className={styles.fullWidth}>Description (English)<textarea rows={4} value={content.about.descEn} onChange={e => set('about', 'descEn', e.target.value)} /></label>
                </div>
            </div>
        </div>
    );
}
