import { NextResponse } from 'next/server';

const ADMIN_ID = process.env.ADMIN_ID || 'admin';
const ADMIN_PW = process.env.ADMIN_PW || 'admin123';
const SESSION_TOKEN = 'jp-admin-session';

export async function POST(request) {
    const { id, password } = await request.json();
    if (id === ADMIN_ID && password === ADMIN_PW) {
        return NextResponse.json({ token: SESSION_TOKEN });
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
