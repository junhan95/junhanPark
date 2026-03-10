import { NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/kv';
import initialContent from '@/data/content.json';

const KEY = 'content';

async function readContent() {
    const data = await getJSON(KEY);
    if (data) return data;
    await setJSON(KEY, initialContent);
    return initialContent;
}

export async function GET() {
    return NextResponse.json(await readContent());
}

export async function PUT(request) {
    const body = await request.json();
    await setJSON(KEY, body);
    return NextResponse.json(body);
}
