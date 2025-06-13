import { useEffect, useRef, useState } from "react";
import STATUS from "../constants/status";
import useAuth from "../hooks/useAuth";
import playSound from "../utils/playSound";
import { useTranslation } from "react-i18next";
import User from "../objects/User";
import { ACHIEVEMENTS } from "../constants/achievements";
import ToastType from "../types/Toast";
import Confetti from "./Confetti";
import useSettings from "../hooks/useSettings";
// a1a4ff

const Toast = ({ isLast, message, onDone, status, donationsAmount, viewersAmount }: ToastType) => {
    const [visible, setVisible] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { t } = useTranslation();
    const remaining = useRef((status == STATUS.ACHIEVEMENT || status === STATUS.TASK) ? 7000 : 5000);
    const startTime = useRef(0);
    const paused = useRef(false);
    const { assets } = useAuth();
    const { settings } = useSettings();

    useEffect(() => {
        setVisible(true);

        if (status == STATUS.ACHIEVEMENT || status === STATUS.TASK) {
            playSound(assets?.sounds.achievement, settings);
            setShowConfetti(true);
        } else {
            playSound(assets?.sounds.toast, settings);
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

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isLast) {
            timer = setTimeout(() => {
                document.querySelector('.important-message')?.classList.add('opacity-0');
            }, 2500);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, []);

    return (
        <div
            onMouseEnter={pauseTimer}
            onMouseLeave={resumeTimer}
            className={`cursor-pointer ${!User.getInstance().hasAchievement(ACHIEVEMENTS.SETTINGS_TRY_TO_QUIT) ? 'pointer-events-none' : 'pointer-events-auto'} hover:brightness-125 transitions shadow-lg relative max-w-[275px] w-max 3xs:max-w-[300px] 2xs:max-w-[325px] sm:max-w-[450px] h-max flex  ${status == STATUS.ACHIEVEMENT ? 'bg-secondary-500 rounded-xs  justify-center items-center flex-row px-3 py-3.5' : status == STATUS.TASK ? 'bg-[#e2e3ff] rounded-xs gap-1.5 justify-center items-center flex-col px-3 py-3' : 'bg-primary-500 rounded-sm p-3 justify-start items-center'} text-white transition-all duration-300 ease-in-out transform
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
            {showConfetti && <Confetti type={status as string} />}

            {(isLast) && (
                <div className={`transition-all duration-200 absolute ${status == STATUS.ACHIEVEMENT ? 'top-[85%]' : 'top-[75%]'} right-[-5%] z-30`}>
                    <img src={assets?.images?.toast.src} alt="Toast Icon" className="w-14" />
                </div>
            )}
            {status == STATUS.ACHIEVEMENT && (
                <span className="w-max text-2xl bg-primary-400/80 font-primary py-1.5 px-3 rounded-[2px] text-nowrap text-white">
                    +{donationsAmount}€
                </span>

            )}
            {status == STATUS.TASK && (
                <span className="w-max text-2xl bg-primary-400/80 font-primary py-1.5 px-3 rounded-[2px] text-nowrap text-white">
                    +{viewersAmount} <span className="text-lg">{t('statistics.viewers').toLocaleLowerCase()}</span>
                </span>
            )}

            {(status == STATUS.ACHIEVEMENT || status == STATUS.TASK) ? (
                <div className="text-center flex flex-col items-center gap-1">
                    {status === STATUS.ACHIEVEMENT && (
                        <span className="text-sm font-primary text-black font-bold opacity-75 whitespace-pre-wrap break-words">
                            {t(`achievements.${message}.title`)}
                        </span>
                    )}
                    <span className="ml-2 text-sm text-black
                     text-center font-primary whitespace-pre-wrap break-words">
                        {status === STATUS.ACHIEVEMENT ? t(`achievements.${message}.description`) : t(`tasks.${message}`)}
                    </span>
                </div>
            ) : (
                <p className="text-sm font-primary text-gray-200 whitespace-pre-wrap break-words">
                    {message.split("**").map((part: string, index: number) => {
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

export default Toast;