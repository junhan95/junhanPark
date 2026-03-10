import { kv } from '@vercel/kv';

export async function getJSON(key, fallback = null) {
    const data = await kv.get(key);
    return data ?? fallback;
}

export async function setJSON(key, value) {
    await kv.set(key, value);
}
