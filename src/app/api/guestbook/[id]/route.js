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

export async function DELETE(request, { params }) {
    const { id } = await params;
    const entries = readGuestbook();
    const filtered = entries.filter((e) => e.id !== id);
    if (filtered.length === entries.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    writeGuestbook(filtered);
    return NextResponse.json({ success: true });
}
