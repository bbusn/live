import { DateTime } from 'luxon';

export interface UserType {
    username: string;
    datetime: DateTime;
}

export class User {
    private static _instance: User;

    private _username: string = '';
    private _datetime: DateTime = DateTime.now();
    private _viewers: number = 0;
    private _donations: number = 0;

    private constructor(username = '', datetime = DateTime.now()) {
        this._username = username;
        this._datetime = datetime;
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

    private _initialized = false;

    public initialize({ username, datetime }: UserType) {
        if (this._initialized) return;
        this._username = username;
        this._datetime = datetime;
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
