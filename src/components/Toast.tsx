import { useEffect, useRef, useState } from "react";
import { STATUS, StatusType } from "../constants/status";
import toast from '../assets/images/toast.png'
import { useAuth } from "../hooks/useAuth";

export type ToastProps = {
    id: number;
    isLast?: boolean;
    status: StatusType;
    message: string;
    onDone?: () => void;
};

export function Toast({ isLast, message, status, onDone }: ToastProps) {
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const remaining = useRef(6000);
    const startTime = useRef(0);
    const paused = useRef(false);
    const { assets } = useAuth();

    useEffect(() => {
        setVisible(true);
        const sound = assets?.sounds.toast;
        if (sound) {
            sound.play()
        }
        startTimer();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const startTimer = () => {
        startTime.current = Date.now();
        timeoutRef.current = setTimeout(() => {
            setVisible(false);
            setTimeout(() => {
                onDone?.();
            }, 300);
        }, remaining.current);
    };

    const pauseTimer = () => {
        if (paused.current) return;
        paused.current = true;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        const elapsed = Date.now() - startTime.current;
        remaining.current -= elapsed;
    };

    const resumeTimer = () => {
        if (!paused.current) return;
        paused.current = false;
        startTimer();
    };

    let statusClass = "";

    switch (status) {
        case STATUS.SUCCESS:
            statusClass = "bg-green-500";
            break;
        case STATUS.ERROR:
            statusClass = "bg-red-500";
            break;
        case STATUS.INFO:
            statusClass = "bg-blue-500";
            break;
        default:
            statusClass = "bg-gray-500";
    }

    return (
        <div
            onMouseEnter={pauseTimer}
            onMouseLeave={resumeTimer}
            className={`shadow-lg relative max-w-[275px] 3xs:max-w-[300px] 2xs:max-w-[325px] sm:max-w-[450px] h-max flex justify-start items-center bg-primary-900 text-white p-4 rounded-sm transition-all duration-300 ease-in-out transform
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
            {isLast && (
                <div className="transition-all duration-200 absolute top-[60%] right-[-5%] z-30">
                    <img src={toast} alt="Toast Icon" className="w-14" />
                </div>
            )}

            <p className="text-sm font-primary whitespace-pre-wrap break-words">
                {message.split("**").map((part, index) => {
                    const isHighlighted = index % 2 === 1;
                    const hasPercent = part.includes("%");
                    const cleaned = part.replace(/%/g, "");

                    if (isHighlighted) {
                        return (
                            <span
                                key={index}
                                className={`inline break-words py-1 px-[1px] ${hasPercent ? "bg-secondary-900 text-secondary-400" : "bg-white text-black"
                                    }`}
                            >
                                {cleaned}
                            </span>
                        );
                    }

                    return <span key={index} className="inline">{part}</span>;
                })}
            </p>

        </div>

    );
}
