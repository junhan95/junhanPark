import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const dataPath = join(process.cwd(), 'src', 'data', 'blogs.json');

function readBlogs() {
    return JSON.parse(readFileSync(dataPath, 'utf-8'));
}

function writeBlogs(data) {
    writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(request, { params }) {
    const { id } = await params;
    const blogs = readBlogs();
    const post = blogs.find((b) => b.id === id);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(post);
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    const blogs = readBlogs();
    const idx = blogs.findIndex((b) => b.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    blogs[idx] = { ...blogs[idx], ...body };
    writeBlogs(blogs);
    return NextResponse.json(blogs[idx]);
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const blogs = readBlogs();
    const filtered = blogs.filter((b) => b.id !== id);
    if (filtered.length === blogs.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    writeBlogs(filtered);
    return NextResponse.json({ success: true });
}
