import { NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/kv';

const KEY = 'guestbook';

export async function GET() {
    const entries = await getJSON(KEY, []);
    return NextResponse.json(entries);
}

export async function POST(request) {
    const { title, content } = await request.json();
    const entries = await getJSON(KEY, []);
    const newEntry = {
        id: Date.now().toString(),
        title,
        content,
        createdAt: new Date().toISOString(),
    };
    entries.unshift(newEntry);
    await setJSON(KEY, entries);
    return NextResponse.json(newEntry, { status: 201 });
}
