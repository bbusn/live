import { useRef, useState } from "react";
import { Toasts } from "../components/Toasts";
import ToastsContext from "../contexts/ToastsContext";
import ToastType from "../types/Toast";

const ToastsProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);
    const importantMessageRef = useRef<HTMLDivElement>(null);

    const toast = (props: Omit<ToastType, "id">) => {
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
        <ToastsContext.Provider value={{ toasts, toast }}>
            {children}
            <Toasts toasts={toasts} onRemove={removeToast} />
            <div ref={importantMessageRef} className="transition-all duration-1000 important-message pointer-events-none opacity-0 fixed top-1/2 -translate-1/2 left-1/2 min-h-screen w-full h-full bg-black/75 z-40"></div>
        </ToastsContext.Provider>
    );
}

export default ToastsProvider;