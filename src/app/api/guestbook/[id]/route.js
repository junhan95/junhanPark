import { NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/kv';

const KEY = 'guestbook';

export async function DELETE(request, { params }) {
    const { id } = await params;
    const entries = await getJSON(KEY, []);
    const filtered = entries.filter((e) => e.id !== id);
    if (filtered.length === entries.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    await setJSON(KEY, filtered);
    return NextResponse.json({ success: true });
}
