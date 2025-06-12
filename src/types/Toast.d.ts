type ToastType = {
    id: number;
    isLast?: boolean;
    status: StatusType;
    message: string;
    achievement?: string;
    donationsAmount?: number;
    onDone?: () => void;
};

export default ToastType;
