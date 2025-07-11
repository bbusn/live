import { DEFAULT_TASKS } from '../constants/tasks';
import { AUTH_TOKEN_KEY } from './auth';

function strToUint8(str: string): Uint8Array {
    return new TextEncoder().encode(str);
}

function uint8ToStr(buf: Uint8Array): string {
    return new TextDecoder().decode(buf);
}

async function getKey(key: string): Promise<CryptoKey> {
    return crypto.subtle.importKey('raw', strToUint8(key), { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

export async function encrypt(data: object): Promise<string> {
    const key = await getKey(AUTH_TOKEN_KEY);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = strToUint8(JSON.stringify(data));

    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

    const buffer = new Uint8Array([...iv, ...new Uint8Array(encrypted)]);
    return btoa(String.fromCharCode(...buffer));
}

export async function decrypt(token: string): Promise<object | null> {
    try {
        const raw = Uint8Array.from(atob(token), (c) => c.charCodeAt(0));
        const iv = raw.slice(0, 12);
        const data = raw.slice(12);

        const key = await getKey(AUTH_TOKEN_KEY);
        const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
        const json = uint8ToStr(new Uint8Array(decrypted));
        const jsonParsed = JSON.parse(json);

        return {
            username: jsonParsed._username ?? '',
            started_at: jsonParsed._started_at ? new Date(jsonParsed._started_at) : new Date(),
            last_connected_at: jsonParsed._last_connected_at ? new Date(jsonParsed._last_connected_at) : new Date(),
            viewers: jsonParsed._viewers ?? 0,
            donations: jsonParsed._donations ?? 0,
            achievements: jsonParsed._achievements ?? [],
            tasks: jsonParsed._tasks ?? DEFAULT_TASKS,
        };
    } catch (e) {
        return null;
    }
}
