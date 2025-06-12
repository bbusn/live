import { createContext, useContext, useRef, useState } from "react";
import { ToastProps } from "../components/Toast";
import { Toasts } from "../components/Toasts";

export const ToastContext = createContext<{
    toasts: ToastProps[];
    toast: (props: Omit<ToastProps, "id">) => void;
}>({
    toasts: [],
    toast: () => { }
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    const importantMessageRef = useRef<HTMLDivElement>(null);

    const toast = (props: Omit<ToastProps, "id">) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, ...props }]);

        importantMessageRef.current?.classList.remove("opacity-0");
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));

        if (toasts.length === 1 || toasts.length === 0) {
            importantMessageRef.current?.classList.add("opacity-0");
        }
    };

    return (
        <ToastContext.Provider value={{ toasts, toast }}>
            {children}
            <Toasts toasts={toasts} onRemove={removeToast} />
            <div ref={importantMessageRef} className="transition-all duration-1000 important-message pointer-events-none opacity-0 absolute top-1/2 -translate-1/2 left-1/2 w-full h-full bg-black/60 z-40"></div>
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
