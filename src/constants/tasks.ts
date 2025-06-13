export const TASKS = {
    OPEN_CHAT: 'open_chat',
    OPEN_2_PROJECTS: 'open_2_projects',
    LEARN_ABOUT_ME: 'learn_about_me',
    EARN_100_EUROS: 'earn_100_euros',
} as const;

export const DEFAULT_TASKS = [
    {
        name: TASKS.OPEN_CHAT,
        checked: false,
    },
    {
        name: TASKS.OPEN_2_PROJECTS,
        checked: false,
    },
    {
        name: TASKS.LEARN_ABOUT_ME,
        checked: false,
    },
    {
        name: TASKS.EARN_100_EUROS,
        checked: false,
    },
];
