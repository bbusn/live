import { DateTime } from 'luxon';

export interface UserType {
    username: string;
    datetime: DateTime;
    viewers: number;
    donations: number;
    achievements: string[];
}

export class User {
    private static _instance: User;

    private _username: string = '';
    private _datetime: DateTime = DateTime.now();
    private _viewers: number = 0;
    private _donations: number = 0;
    private _achievements: string[] = [];

    private constructor(username = '', datetime = DateTime.now(), viewers = 0, donations = 0, achievements: string[] = []) {
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

    public get datetime(): DateTime {
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

    public addAchievement(achievement: string) {
        if (!this._achievements.includes(achievement)) {
            this._achievements.push(achievement);
        }
    }

    public hasAchievement(achievement: string): boolean {
        return this._achievements.includes(achievement);
    }

    private _initialized = false;

    public initialize(user: UserType) {
        if (this._initialized) return;
        this._username = user.username;
        this._datetime = user.datetime;
        this._viewers = user.viewers ?? 0;
        this._donations = user.donations ?? 0;
        this._achievements = user.achievements ?? [];
        this._initialized = true;
    }

    public updateViewers(count: number) {
        this._viewers = count;
    }

    public addDonation(amount: number) {
        this._donations += amount;
    }

    public reset() {
        this._username = '';
        this._datetime = DateTime.now();
        this._viewers = 0;
        this._donations = 0;
    }
}
