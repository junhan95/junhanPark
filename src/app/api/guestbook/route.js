import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const dataPath = join(process.cwd(), 'src', 'data', 'guestbook.json');

function readGuestbook() {
    return JSON.parse(readFileSync(dataPath, 'utf-8'));
}

function writeGuestbook(data) {
    writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
    return NextResponse.json(readGuestbook());
}

export async function POST(request) {
    const { title, content } = await request.json();
    const entries = readGuestbook();
    const newEntry = {
        id: Date.now().toString(),
        title,
        content,
        createdAt: new Date().toISOString(),
    };
    entries.unshift(newEntry);
    writeGuestbook(entries);
    return NextResponse.json(newEntry, { status: 201 });
}
