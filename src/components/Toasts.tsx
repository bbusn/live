import ToastType from "../types/Toast";
import Toast from "./Toast";

export function Toasts({
    toasts,
    onRemove
}: {
    toasts: ToastType[];
    onRemove: (id: number) => void;
}) {
    return (
        <div className="pointer-events-none transitions fixed top-10 right-10 flex justify-start items-end flex-col gap-2 z-50">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    isLast={toasts[toasts.length - 1]?.id === toast.id}
                    {...toast}
                    onDone={() => onRemove(toast.id!)}
                />
            ))}
        </div>
    );
}
