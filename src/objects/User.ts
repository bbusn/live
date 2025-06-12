import { encrypt } from '../utils/encrypt';
import { AUTH_TOKEN_ITEM_NAME } from '../utils/auth';
import UserType from '../types/User';

class User {
    private static _instance: User;

    private _username: string = '';
    private _started_at: Date = new Date();
    private _last_connected_at: Date = new Date();
    private _viewers: number = 0;
    private _donations: number = 0;
    private _achievements: string[] = [];
    private _tasks: string[] = [];

    private constructor(
        username = '',
        started_at: Date = new Date(),
        last_connected_at: Date = new Date(),
        viewers = 0,
        donations = 0,
        achievements: string[] = [],
        tasks: string[] = [],
    ) {
        this._username = username;
        this._started_at = started_at;
        this._last_connected_at = last_connected_at;
        this._viewers = viewers;
        this._donations = donations;
        this._achievements = achievements;
        this._tasks = tasks;
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

    public get started_at(): Date {
        return this._started_at;
    }
    public get last_connected_at(): Date {
        return this._last_connected_at;
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

    public get tasks(): string[] {
        return this._tasks;
    }

    public async addAchievement(achievement: string) {
        if (!this._achievements.includes(achievement)) {
            this._achievements.push(achievement);
            await this.save();
        }
    }

    public hasAchievement(achievement: string): boolean {
        return this._achievements.includes(achievement);
    }

    public addTask(task: string) {
        if (!this._tasks.includes(task)) {
            this._tasks.push(task);
            this.save();
        }
    }

    public hasTask(task: string): boolean {
        return this._tasks.includes(task);
    }

    private _initialized = false;

    public initialize(user: UserType) {
        if (this._initialized) return;
        this._username = user.username;
        this._started_at = user.started_at ? user.started_at : new Date();
        this._last_connected_at = user.last_connected_at ? user.last_connected_at : new Date();
        this._viewers = user.viewers ?? 0;
        this._donations = user.donations ?? 0;
        this._achievements = user.achievements ?? [];
        this._tasks = user.tasks ?? [];
        this._initialized = true;
        this.save();
    }

    public updateViewers(count: number) {
        this._viewers = count;
    }

    public async updateLastConnectedAt(date: Date) {
        this._last_connected_at = date;
        await this.save();
    }

    public addDonation(amount: number) {
        this._donations += amount;
    }

    public async save() {
        const encrypted = await encrypt(User.getInstance());
        localStorage.setItem(AUTH_TOKEN_ITEM_NAME, encrypted);
    }
}

export default User;
