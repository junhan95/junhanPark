import { NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/kv';
import initialBlogs from '@/data/blogs.json';

const KEY = 'blogs';

async function readBlogs() {
    const data = await getJSON(KEY);
    if (data) return data;
    await setJSON(KEY, initialBlogs);
    return initialBlogs;
}

export async function GET(request, { params }) {
    const { id } = await params;
    const blogs = await readBlogs();
    const post = blogs.find((b) => b.id === id);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(post);
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    const blogs = await readBlogs();
    const idx = blogs.findIndex((b) => b.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    blogs[idx] = { ...blogs[idx], ...body };
    await setJSON(KEY, blogs);
    return NextResponse.json(blogs[idx]);
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const blogs = await readBlogs();
    const filtered = blogs.filter((b) => b.id !== id);
    if (filtered.length === blogs.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    await setJSON(KEY, filtered);
    return NextResponse.json({ success: true });
}
