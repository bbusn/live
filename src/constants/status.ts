export const STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
} as const;

export type StatusType = (typeof STATUS)[keyof typeof STATUS];
