import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import playSound from "../utils/playSound";
import useAuth from "../hooks/useAuth";
import useSettings from "../hooks/useSettings";
import useTasks from "../hooks/useTasks";
import ICONS from "../constants/icons";
import User from "../objects/User";

const Tasks = () => {
    const { t } = useTranslation();
    const [isPressingHeader, setIsPressingHeader] = useState(false);
    const tasksContainerRef = useRef<HTMLDivElement>(null);
    const { tasks, tasksCollapsed, setTasksCollapsed } = useTasks();
    const { assets } = useAuth();
    const { settings } = useSettings();

    const handleToggle = () => {
        playSound(assets?.sounds?.click, settings);
        setTasksCollapsed(!tasksCollapsed);
    };

    useEffect(() => {
        User.getInstance().setTasks(tasks);
    }, [tasks]);

    return (
        <div
            ref={tasksContainerRef}
            className={`!pointer-events-auto border border-transparent hover:border-secondary-400 tasks cursor-pointer rounded-lg overflow-hidden z-10 ${tasksCollapsed ? 'h-max' : 'h-[300px]'} w-full max-w-[95%] 2xs:max-w-[90%] xs:max-w-[85%] 2sm:w-[450px] transition-all duration-200 transform ${isPressingHeader ? 'scale-[0.98]' : ''
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
                className="transitions hover:brightness-125 bg-primary-400 rounded-md h-[17.5%] pl-6 pr-4 w-full flex justify-between items-center py-2">
                <p className="font-semibold text-lg">{t('navigation.tasks')}</p>
                <button className="transitions active:scale-90 cursor-pointer text-white font-bold">
                    {tasksCollapsed ? (
                        <Icon icon="mdi:chevron-up" className="text-4xl" />
                    ) : (
                        <Icon icon="mdi:chevron-down" className="text-4xl" />
                    )}
                </button>
            </div>
            <div className={`${tasksCollapsed && 'hidden'} transitions bg-primary-500 h-full w-full flex flex-col justify-center items-center px-12 py-2`}>
                <div className="-mt-4 h-full w-max flex flex-col justify-center items-start gap-4">
                    {tasks.map((task) => {
                        return (
                            <li key={task.name} className={`${task.checked && 'opacity-50'} flex flex-row gap-4 items-center`}>
                                <div className={`${task.checked ? 'bg-white' : 'bg-white'} flex justify-center items-center pointer-events-none w-6 h-6 rounded-sm`}>
                                    {task.checked && (
                                        <Icon icon={ICONS.CHECKED} className="text-primary-900 w-5 h-5 font-bold" />
                                    )}
                                </div>
                                <p className={`text-sm ${task.checked ? 'line-through' : 'no-underline'}`}>{t(`tasks.${task.name}`)}</p>
                            </li>
                        );
                    })}
                </div>

            </div>
        </div>
    )
};

export default Tasks;