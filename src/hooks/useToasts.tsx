import { createContext, useContext, useState } from "react";
import { ToastProps } from "../components/Toast";
import { Toasts } from "../components/Toasts";

const ToastContext = createContext<{
    toasts: ToastProps[];
    toast: (props: Omit<ToastProps, "id">) => void;
}>({
    toasts: [],
    toast: () => { }
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const toast = (props: Omit<ToastProps, "id">) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, ...props }]);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, toast }}>
            {children}
            <Toasts toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

export const useToasts = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToasts must be used within a ToastProvider");
    }
    return context;
};
