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

export async function GET() {
    return NextResponse.json(await readBlogs());
}

export async function POST(request) {
    const body = await request.json();
    const blogs = await readBlogs();
    const newPost = {
        ...body,
        id: Date.now().toString(),
        date: body.date || new Date().toISOString().split('T')[0],
    };
    blogs.unshift(newPost);
    await setJSON(KEY, blogs);
    return NextResponse.json(newPost, { status: 201 });
}
