type UserType = {
    username: string;
    started_at: Date;
    last_connected_at: Date;
    viewers: number;
    donations: number;
    achievements: string[];
    tasks: TaskType[];
};

export default UserType;
