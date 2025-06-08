export const AUTH_STATUS = {
    AUTH: '53544F505F4C4F4F4B494E47',
    LOADING: '41545F4D595F434F4445',
    UNAUTH: '594F555F435552494F5553',
};

export const AuthTokenName = 'auth_token';

export type AuthStatusType = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];
