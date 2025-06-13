import { useRef } from "react";
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import ICONS from "../constants/icons";
import { Icon } from "@iconify/react";
import useSettings from "../hooks/useSettings";
import playSound from "../utils/playSound";
import ResourceType from "../types/Resource";
import User from "../objects/User";
import { TASKS } from "../constants/tasks";
import useTasks from "../hooks/useTasks";
import useToasts from "../hooks/useToasts";
import STATUS from "../constants/status";

const Resource = (resource: ResourceType) => {
    const { settings } = useSettings();
    const { assets } = useAuth();
    const { toast } = useToasts();
    const user = User.getInstance();
    const modalContainerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const { setTasks, setTasksCollapsed } = useTasks();

    const openModal = () => {
        playSound(assets?.sounds.click, settings);
        if (modalContainerRef.current) {
            modalContainerRef.current.classList.toggle("hidden");
            modalContainerRef.current.classList.toggle("flex");
            setTimeout(() => {
                modalContainerRef.current?.classList.toggle("opacity-100");
                modalRef.current?.classList.toggle("scale-0");
                playSound(assets?.sounds.modal, settings);
            }, 250);
        }
        window.addEventListener("keydown", escapeModal);
    };

    const escapeModal = (e: KeyboardEvent) => {
        if (
            e.key === "Escape" &&
            modalContainerRef.current?.classList.contains("flex")
        ) {
            closeModal();
        }
    };

    const closeModal = () => {
        playSound(assets?.sounds.click, settings);
        if (modalContainerRef.current) {
            modalContainerRef.current.classList.toggle("opacity-100");
            modalRef.current?.classList.toggle("scale-0");
            setTimeout(() => {
                modalContainerRef.current?.classList.toggle("hidden");
                modalContainerRef.current?.classList.toggle("flex");
            }, 300);
        }
        window.removeEventListener("keydown", escapeModal);
    };

    const toggleModal = () => {
        if (modalContainerRef.current?.classList.contains("hidden")) {
            openModal();
        } else {
            closeModal();
        }
    };

    return (
        <>
            <div
                onClick={() => {
                    toggleModal();
                }}
                className="transitions relative outline outline-transparent hover:outline-secondary-400 hover:saturate-100 lg:saturate-0 cursor-pointer active:scale-90 flex flex-col items-center justify-center bg-primary-300 p-1.5 h-max w-max"
            >
                <img
                    src={assets?.images.base.src ?? ""}
                    className="w-20 xl:w-24 h-20 xl:h-24"
                />
                <Icon
                    icon={ICONS[resource.name.toUpperCase().replaceAll(" ", "_") as keyof typeof ICONS]}
                    className="absolute z-10 top-1/2 -translate-1/2 left-1/2 text-primary-900 w-8 h-8 object-contain"
                />
            </div>

            <div
                ref={modalContainerRef}
                onClick={(e) => {
                    if (
                        e.target === modalContainerRef.current &&
                        modalContainerRef.current.classList.contains("flex")
                    ) {
                        toggleModal();
                    }
                }}
                className="hidden flex-col justify-center items-center opacity-0 transitions fixed top-1/2 -translate-1/2 left-1/2 w-full h-full bg-black/75 z-40"
            >
                <div ref={modalRef} className="-mt-10 scale-0 relative h-max w-max transitions flex flex-col flex-wrap items-center justify-start">
                    <div
                        className="overflow-y-hidden overflow-x-hidden bg-primary-500 max-w-[80vw] w-full h-[175px] xs:max-w-[350px] sm:w-[350px] rounded-lg flex flex-col flex-wrap items-center justify-center px-6 py-2"
                    >
                        <div className="relative w-full h-max flex flex-col items-center justify-start gap-2 py-12 sm:py-8">

                            <p className="mt-2 max-w-[95%] sm:max-w-[80%] text-sm text-center font-primary whitespace-pre-wrap break-words">
                                {resource.description.split("**").map((part, index) => {
                                    const isHighlighted = index % 2 === 1;
                                    const hasPercent = part.includes("%");
                                    const hasAmpersand = part.includes("&");
                                    const hasDollar = part.includes("$");

                                    let highLightColor = "font-bold text-gray-200";

                                    if (hasPercent) {
                                        highLightColor = "bg-gray-100 text-black";
                                    } else if (hasAmpersand) {
                                        highLightColor = "bg-secondary-900 text-secondary-300";
                                    } else if (hasDollar) {
                                        highLightColor = "bg-yellow-900 text-yellow-300";
                                    }

                                    const cleaned = part.replace(/[%&$]/g, "");

                                    if (isHighlighted) {
                                        return (
                                            <span
                                                key={index}
                                                className={`inline break-words py-0.5 px-0.5 ${highLightColor}`}
                                            >
                                                {cleaned}
                                            </span>
                                        );
                                    }

                                    return <span key={index} className="inline">{part}</span>;
                                })}
                            </p>
                        </div>
                    </div>
                    {(resource.url && resource.url.length > 0) && (
                        <button
                            className="top-[102.5%] flex justify-center items-center gap-4 transitions absolute button-primary w-full"
                            onClick={() => {
                                playSound(assets?.sounds.click, settings);
                                if (!User.getInstance().isTaskChecked(TASKS.LEARN_ABOUT_ME)) {
                                    const viewers = user.viewers;
                                    const random = Math.floor(Math.random() * 2) + 1 * 40;
                                    const newViewers = viewers + random < 0 ? 0 : viewers + random;
                                    user.updateViewers(newViewers);
                                    setTasks(
                                        user.tasks.map(task =>
                                            task.name === TASKS.LEARN_ABOUT_ME
                                                ? { ...task, checked: true }
                                                : task
                                        )
                                    );
                                    toast({
                                        status: STATUS.TASK,
                                        message: TASKS.LEARN_ABOUT_ME,
                                        viewersAmount: Math.floor(Math.random() * 2) + 1 * 40,
                                    });
                                    setTasksCollapsed(false);
                                }
                                window.open(resource.url, "_blank");
                            }}
                        >
                            <Icon icon={ICONS.SEE}
                                className="text-black w-5" />
                            {t('resource.see')}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Resource;
