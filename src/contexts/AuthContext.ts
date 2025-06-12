import { createContext } from 'react';
import { AUTH_STATUS, AuthStatusType } from '../utils/auth';
import AssetsType from '../types/Assets';

const AuthContext = createContext<{
    status: AuthStatusType;
    setStatus: (status: AuthStatusType) => void;
    connect: () => Promise<void>;
    error: boolean;
    assets: AssetsType | null;
}>({
    status: AUTH_STATUS.LOADING,
    setStatus: () => {},
    connect: async () => {},
    error: false,
    assets: null,
});

export default AuthContext;
