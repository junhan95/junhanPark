import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const dataPath = join(process.cwd(), 'src', 'data', 'content.json');

export async function GET() {
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    return NextResponse.json(data);
}

export async function PUT(request) {
    const body = await request.json();
    writeFileSync(dataPath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json(body);
}
