import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import playSound from "../utils/playSound";
import useAuth from "../hooks/useAuth";

const Chat = () => {
    const { t } = useTranslation();
    const [collapsed, setCollapsed] = useState(true);
    const [isPressingHeader, setIsPressingHeader] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { assets } = useAuth();

    const handleToggle = () => {
        playSound(assets?.sounds?.click);
        setCollapsed(prev => !prev);
    };

    return (
        <div
            ref={chatContainerRef}
            className={`!pointer-events-auto chat cursor-pointer rounded-lg overflow-hidden z-10 ${collapsed ? 'h-max' : 'h-[450px]'} w-full max-w-[95%] 2xs:max-w-[90%] xs:max-w-[85%] 2sm:w-[450px] transition-all duration-200 transform ${isPressingHeader ? 'scale-[0.98]' : ''
                } flex flex-col justify-between items-center bg-primary-500 shadow-lg`}
        >
            <div onClick={() => {
                handleToggle();
            }}
                onMouseDown={() => setIsPressingHeader(true)}
                onMouseUp={() => setIsPressingHeader(false)}
                onMouseLeave={() => setIsPressingHeader(false)}
                onTouchStart={() => setIsPressingHeader(true)}
                onTouchEnd={() => setIsPressingHeader(false)}
                className="transitions hover:brightness-125 bg-primary-400 rounded-md h-[12.5%] pl-6 pr-4 w-full flex justify-between items-center py-2">
                <p className="font-semibold text-lg">{t('navigation.chat')}</p>
                <button className="transitions active:scale-90 cursor-pointer text-white font-bold">
                    {collapsed ? (
                        <Icon icon="mdi:chevron-up" className="text-4xl" />
                    ) : (
                        <Icon icon="mdi:chevron-down" className="text-4xl" />
                    )}
                </button>
            </div>
            <div className={`${collapsed && 'hidden'} transitions bg-primary-500 h-[72.5%] w-full flex justify-between items-center p-3`}>

            </div>
            <div className={`${collapsed && 'hidden'} transitions bg-primary-400 rounded-md h-[12.5%] w-full flex justify-between items-center p-3`}>

            </div>
        </div>
    )
};

export default Chat;