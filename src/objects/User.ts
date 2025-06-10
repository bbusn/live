import { DateTime } from 'luxon';
import { encrypt } from '../utils/encrypt';
import { AUTH_TOKEN_ITEM_NAME } from '../utils/auth';

export interface UserType {
    username: string;
    datetime: string;
    viewers: number;
    donations: number;
    achievements: string[];
}

export class User {
    private static _instance: User;

    private _username: string = '';
    private _datetime: string = DateTime.now().toISO();
    private _viewers: number = 0;
    private _donations: number = 0;
    private _achievements: string[] = [];

    private constructor(username = '', datetime = DateTime.now().toISO(), viewers = 0, donations = 0, achievements: string[] = []) {
        this._username = username;
        this._datetime = datetime;
        this._viewers = viewers;
        this._donations = donations;
        this._achievements = achievements;
    }

    public static getInstance(): User {
        if (!User._instance) {
            User._instance = new User();
        }
        return User._instance;
    }

    public get username(): string {
        return this._username;
    }

    public get datetime(): string {
        return this._datetime;
    }

    public get viewers(): number {
        return this._viewers;
    }

    public get donations(): number {
        return this._donations;
    }

    public get achievements(): string[] {
        return this._achievements;
    }

    public async addAchievement(achievement: string) {
        if (!this._achievements.includes(achievement)) {
            // this._achievements.push(achievement);
            const encrypted = await encrypt(User.getInstance());
            localStorage.setItem(AUTH_TOKEN_ITEM_NAME, encrypted);
        }
    }

    public hasAchievement(achievement: string): boolean {
        return this._achievements.includes(achievement);
    }

    private _initialized = false;

    public initialize(user: UserType) {
        if (this._initialized) return;
        this._username = user.username;
        this._datetime = user.datetime || DateTime.now().toISO();
        this._viewers = user.viewers ?? 0;
        this._donations = user.donations ?? 0;
        this._achievements = user.achievements ?? [];
        this._initialized = true;
    }

    public updateViewers(count: number) {
        this._viewers = count;
    }

    public addDonation(amount: number) {
        console.log(`Adding donation: ${this._donations}`);
        console.log(`Adding donation: ${amount}`);
        console.log(`Current donations: ${this._donations}`);
        this._donations += amount;
    }
}
