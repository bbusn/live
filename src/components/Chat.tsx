import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import playSound from "../utils/playSound";
import useAuth from "../hooks/useAuth";
import useSettings from "../hooks/useSettings";
import User from "../objects/User";
import { TASKS } from "../constants/tasks";
import useToasts from "../hooks/useToasts";
import STATUS from "../constants/status";
import useTasks from "../hooks/useTasks";

const Chat = () => {
    const { t } = useTranslation();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isPressingHeader, setIsPressingHeader] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { assets } = useAuth();
    const { toast } = useToasts();
    const { settings } = useSettings();
    const user = User.getInstance();
    const { setTasks, setTasksCollapsed } = useTasks();

    const handleToggle = () => {
        playSound(assets?.sounds?.click, settings);
        setIsCollapsed(prev => !prev);
    };

    useEffect(() => {
        if (!isCollapsed && (!User.getInstance().isTaskChecked(TASKS.OPEN_CHAT))) {
            const viewers = user.viewers;
            const random = Math.floor(Math.random() * 2) + 1 * 40;
            const newViewers = viewers + random < 0 ? 0 : viewers + random;
            user.updateViewers(newViewers);
            setTasks(
                user.tasks.map(task =>
                    task.name === TASKS.OPEN_CHAT
                        ? { ...task, checked: true }
                        : task
                )
            );
            toast({
                status: STATUS.TASK,
                message: TASKS.OPEN_CHAT,
                viewersAmount: Math.floor(Math.random() * 2) + 1 * 40,
            });
            setTasksCollapsed(false);
        }
    }, [isCollapsed]);

    return (
        <div
            ref={chatContainerRef}
            className={`!pointer-events-auto chat cursor-pointer border border-transparent hover:border-secondary-400 rounded-lg overflow-hidden z-10 ${isCollapsed ? 'h-max' : 'h-[450px]'} w-full max-w-[95%] 2xs:max-w-[90%] xs:max-w-[85%] 2sm:w-[450px] transition-all duration-200 transform ${isPressingHeader ? 'scale-[0.98]' : ''
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
                    {isCollapsed ? (
                        <Icon icon="mdi:chevron-up" className="text-4xl" />
                    ) : (
                        <Icon icon="mdi:chevron-down" className="text-4xl" />
                    )}
                </button>
            </div>
            <div className={`${isCollapsed && 'hidden'} transitions bg-primary-500 h-[72.5%] w-full flex justify-between items-center p-3`}>

            </div>
            <div className={`${isCollapsed && 'hidden'} transitions bg-primary-400 rounded-md h-[12.5%] w-full flex justify-between items-center p-3`}>

            </div>
        </div>
    )
};

export default Chat;