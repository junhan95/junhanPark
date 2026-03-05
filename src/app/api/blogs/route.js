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

export async function GET() {
    return NextResponse.json(readBlogs());
}

export async function POST(request) {
    const body = await request.json();
    const blogs = readBlogs();
    const newPost = {
        ...body,
        id: Date.now().toString(),
        date: body.date || new Date().toISOString().split('T')[0],
    };
    blogs.unshift(newPost);
    writeBlogs(blogs);
    return NextResponse.json(newPost, { status: 201 });
}
