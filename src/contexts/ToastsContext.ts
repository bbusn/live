import { createContext } from 'react';
import ToastType from '../types/Toast';

const ToastsContext = createContext<{
    toasts: ToastType[];
    toast: (props: Omit<ToastType, 'id'>) => void;
}>({
    toasts: [],
    toast: () => {},
});

export default ToastsContext;
