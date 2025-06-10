import { useEffect, useRef, useState } from "react";
import { STATUS, StatusType } from "../constants/status";
import toast from '../assets/images/toast.png'
import { useAuth } from "../hooks/useAuth";
import { playSound } from "../utils/sound";
import { useTranslation } from "react-i18next";

export type ToastProps = {
    id: number;
    isLast?: boolean;
    status: StatusType;
    message: string;
    achievement?: string;
    donationsAmount?: number;
    onDone?: () => void;
};

const Confetti = () => {
    const [particles, setParticles] = useState<Array<{
        id: number;
        x: number;
        y: number;
        vx: number;
        vy: number;
        color: string;
        rotation: number;
        rotationSpeed: number;
    }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -10,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 3 + 2,
            color: ['#FFD700', '#FFA500', '#FF8C00', '#FFAA00', '#FFB347', '#FECA57'][Math.floor(Math.random() * 6)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        }));
        setParticles(newParticles);

        // Animate particles
        const interval = setInterval(() => {
            setParticles(prev =>
                prev.map(particle => ({
                    ...particle,
                    x: particle.x + particle.vx,
                    y: particle.y + particle.vy,
                    rotation: particle.rotation + particle.rotationSpeed,
                    vy: particle.vy + 0.1 // gravity
                })).filter(particle => particle.y < 200) // remove particles that fall too far
            );
        }, 16);

        // Clean up after 3 seconds
        const timeout = setTimeout(() => {
            setParticles([]);
            clearInterval(interval);
        }, 6000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="fixed w-2 h-2 rounded-sm"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        backgroundColor: particle.color,
                        transform: `rotate(${particle.rotation}deg)`,
                        transition: 'none'
                    }}
                />
            ))}
        </div>
    );
};

export function Toast({ isLast, message, onDone, status, donationsAmount }: ToastProps) {
    const [visible, setVisible] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { t } = useTranslation();
    const remaining = useRef(status == STATUS.ACHIEVEMENT ? 7000 : 5000);
    const startTime = useRef(0);
    const paused = useRef(false);
    const { assets } = useAuth();

    useEffect(() => {
        setVisible(true);

        if (status == STATUS.ACHIEVEMENT) {
            playSound(assets?.sounds.achievement);
            setShowConfetti(true);
        } else {
            playSound(assets?.sounds.toast);
        }

        startTimer();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [status]);

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

    return (
        <div
            onMouseEnter={pauseTimer}
            onMouseLeave={resumeTimer}
            className={`shadow-lg relative max-w-[275px] w-max 3xs:max-w-[300px] 2xs:max-w-[325px] sm:max-w-[450px] h-max flex  ${status == STATUS.ACHIEVEMENT ? ' bg-primary-500 rounded-xs  justify-center items-center flex-col px-3 py-3.5' : 'bg-primary-500 rounded-sm p-3 justify-start items-center'} text-white transition-all duration-300 ease-in-out transform
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
            {showConfetti && <Confetti />}

            {(isLast) && (
                <div className={`transition-all duration-200 absolute ${status == STATUS.ACHIEVEMENT ? 'top-[85%]' : 'top-[60%]'} right-[-5%] z-30`}>
                    <img src={toast} alt="Toast Icon" className="w-14" />
                </div>
            )}
            {status == STATUS.ACHIEVEMENT && (
                <>
                    <span className="text-2xl my-2 bg-primary-400/80 font-primary py-0 px-3 text-yellow-400">
                        + {donationsAmount}€
                    </span>
                    <span className="text-sm font-primary text-white whitespace-pre-wrap break-words">
                        [ {t(`achievements.${message}.title`)} ]
                    </span>
                </>
            )}

            {status == STATUS.ACHIEVEMENT ? (
                <p className="text-center">
                    <span className="ml-2 text-sm text-gray-200 text-center font-primary whitespace-pre-wrap break-words">
                        {t(`achievements.${message}.description`)}
                    </span>
                </p>
            ) : (
                <p className="text-sm font-primary text-gray-200 whitespace-pre-wrap break-words">
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
            )}
        </div>
    );
}