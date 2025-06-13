export const ACHIEVEMENTS = {
    SETTINGS_SHOW_SKILLS_FIRST_CLICK: 'settings_show_skills_first_click',
    SETTINGS_SWITCH_TO_ENGLISH: 'settings_switch_to_english',
    SETTINGS_TRY_TO_QUIT: 'settings_try_to_quit',
    NOT_FOUND: 'not_found',
    TIME_PLAYED_2_MINUTES: 'time_played_2_minutes',
    TIME_PLAYED_5_MINUTES: 'time_played_5_minutes',
    TIME_PLAYED_10_MINUTES: 'time_played_10_minutes',
    TIME_PLAYED_20_MINUTES: 'time_played_20_minutes',
    TIME_PLAYED_30_MINUTES: 'time_played_30_minutes',
    TIME_PLAYED_45_MINUTES: 'time_played_45_minutes',
    TIME_PLAYED_1_HOUR: 'time_played_1_hour',
} as const;

export const ACHIEVEMENTS_TIME = {
    [ACHIEVEMENTS.TIME_PLAYED_2_MINUTES]: 2 * 60 * 1000,
    [ACHIEVEMENTS.TIME_PLAYED_5_MINUTES]: 5 * 60 * 1000,
    [ACHIEVEMENTS.TIME_PLAYED_10_MINUTES]: 10 * 60 * 1000,
    [ACHIEVEMENTS.TIME_PLAYED_20_MINUTES]: 20 * 60 * 1000,
    [ACHIEVEMENTS.TIME_PLAYED_30_MINUTES]: 30 * 60 * 1000,
    [ACHIEVEMENTS.TIME_PLAYED_45_MINUTES]: 45 * 60 * 1000,
    [ACHIEVEMENTS.TIME_PLAYED_1_HOUR]: 60 * 60 * 1000,
} as const;
