type ToastType = {
    id: number;
    isLast?: boolean;
    status: string;
    message: string;
    achievement?: string;
    donationsAmount?: number;
    viewersAmount?: number;
    onDone?: () => void;
};

export default ToastType;
