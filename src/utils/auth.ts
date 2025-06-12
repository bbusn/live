export const AUTH_STATUS = {
    AUTH: crypto.randomUUID().slice(0, 10),
    LOADING: crypto.randomUUID().slice(0, 10),
    UNAUTH: crypto.randomUUID().slice(0, 10),
} as const;

export type AuthStatusType = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];

export const BASE_ITEM_NAME = 'benoitbusnardo.live@';
const KEYS_STORAGE_NAME = BASE_ITEM_NAME + '594F555F435552494F5553';

const getOrCreateJSON = <T>(key: string, generator: () => T): T => {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(atob(stored)) as T;

    const value = generator();
    localStorage.setItem(key, btoa(JSON.stringify(value)));
    return value;
};

const getOrCreateString = (key: string, generator: () => string): string => {
    const stored = localStorage.getItem(key);
    if (stored) return atob(stored);

    const value = generator();
    localStorage.setItem(key, btoa(value));
    return value;
};

const uuid16 = () => crypto.randomUUID().replace(/-/g, '').slice(0, 16);
const uuid24 = () => crypto.randomUUID().slice(0, 24);

const AUTH_KEYS_ITEM = getOrCreateJSON(KEYS_STORAGE_NAME, () => ({
    '1': BASE_ITEM_NAME + uuid24(),
    '2': BASE_ITEM_NAME + uuid24(),
}));

export const AUTH_TOKEN_ITEM_NAME = AUTH_KEYS_ITEM['1'];
export const AUTH_TOKEN_KEY_ITEM_NAME = AUTH_KEYS_ITEM['2'];

export const AUTH_TOKEN_KEY = getOrCreateString(AUTH_TOKEN_KEY_ITEM_NAME, uuid16);

export const AUTH_LOADING_TIMEOUT = Math.floor(Math.random() * 3) * 1000 + 1000;
