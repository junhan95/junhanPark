'use client';
import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './GuestbookModal.module.css';

export default function GuestbookModal({ onClose }) {
    const { lang } = useLanguage();
    const ko = lang === 'ko';
    const [title, setTitle] = useState('');
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [files, setFiles] = useState([]);
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);

    const exec = useCallback((cmd, val = null) => {
        document.execCommand(cmd, false, val);
        editorRef.current?.focus();
    }, []);

    const handleFontSize = (e) => {
        exec('fontSize', e.target.value);
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...newFiles]);
        e.target.value = '';
    };

    const removeFile = (idx) => {
        setFiles(prev => prev.filter((_, i) => i !== idx));
    };

    const getContent = () => {
        return editorRef.current?.innerHTML || '';
    };

    const handleSave = async () => {
        const content = getContent().replace(/<[^>]*>/g, '').trim();
        if (!title.trim() || !content) return;
        setSaving(true);
        await fetch('/api/guestbook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title.trim(), content }),
        });
        setSaving(false);
        setSuccess(true);
        setTimeout(() => onClose(), 1200);
    };

    const isEmpty = !title.trim() || !(editorRef.current?.textContent?.trim());

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>📝 {ko ? '방명록' : 'Guestbook'}</h2>

                {success ? (
                    <p className={styles.success}>✅ {ko ? '방명록이 등록되었습니다!' : 'Your guestbook entry has been submitted!'}</p>
                ) : (
                    <>
                        <div className={styles.field}>
                            <label>{ko ? '제목' : 'Title'}</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={ko ? '제목을 입력하세요' : 'Enter a title'} autoFocus />
                        </div>

                        <div className={styles.field}>
                            <label>{ko ? '본문' : 'Content'}</label>
                            <div className={styles.toolbar}>
                                <button type="button" className={styles.toolBtn} onClick={() => exec('bold')} title="Bold"><b>B</b></button>
                                <button type="button" className={styles.toolBtn} onClick={() => exec('italic')} title="Italic"><i>I</i></button>
                                <button type="button" className={styles.toolBtn} onClick={() => exec('underline')} title="Underline"><u>U</u></button>
                                <button type="button" className={styles.toolBtn} onClick={() => exec('strikeThrough')} title="Strikethrough"><s>S</s></button>
                                <div className={styles.divider} />
                                <select className={styles.fontSizeSelect} onChange={handleFontSize} defaultValue="3" title="Font Size">
                                    <option value="1">{ko ? '아주 작게' : 'XS'}</option>
                                    <option value="2">{ko ? '작게' : 'S'}</option>
                                    <option value="3">{ko ? '보통' : 'M'}</option>
                                    <option value="4">{ko ? '크게' : 'L'}</option>
                                    <option value="5">{ko ? '아주 크게' : 'XL'}</option>
                                </select>
                                <div className={styles.divider} />
                                <button type="button" className={styles.toolBtn} onClick={() => exec('justifyLeft')} title="Left Align">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h12M3 18h18" /></svg>
                                </button>
                                <button type="button" className={styles.toolBtn} onClick={() => exec('justifyCenter')} title="Center Align">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M6 12h12M3 18h18" /></svg>
                                </button>
                                <button type="button" className={styles.toolBtn} onClick={() => exec('justifyRight')} title="Right Align">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M9 12h12M3 18h18" /></svg>
                                </button>
                                <div className={styles.divider} />
                                <button type="button" className={styles.toolBtn} onClick={() => exec('insertUnorderedList')} title="Bullet List">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01" /></svg>
                                </button>
                                <button type="button" className={styles.toolBtn} onClick={() => exec('insertOrderedList')} title="Number List">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 6h11M10 12h11M10 18h11M3 5v2M3 17v2M5 17H3M3 11v2h2" /></svg>
                                </button>
                                <div className={styles.divider} />
                                <button type="button" className={styles.toolBtn} onClick={() => fileInputRef.current?.click()} title={ko ? '파일 첨부' : 'Attach file'}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
                                </button>
                                <input ref={fileInputRef} type="file" multiple className={styles.hiddenInput} onChange={handleFileChange} />
                            </div>
                            <div className={styles.editorWrap}>
                                <div
                                    ref={editorRef}
                                    className={styles.editable}
                                    contentEditable
                                    suppressContentEditableWarning
                                    data-placeholder={ko ? '내용을 입력하세요' : 'Write your message here'}
                                />
                            </div>
                        </div>

                        {files.length > 0 && (
                            <div className={styles.attachArea}>
                                {files.map((file, i) => (
                                    <div key={i} className={styles.attachItem}>
                                        📎 {file.name}
                                        <button type="button" className={styles.attachRemove} onClick={() => removeFile(i)}>×</button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className={styles.actions}>
                            <button className={styles.cancelBtn} onClick={onClose}>{ko ? '취소' : 'Cancel'}</button>
                            <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                                {saving ? (ko ? '저장 중...' : 'Saving...') : (ko ? '저장하기' : 'Submit')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
