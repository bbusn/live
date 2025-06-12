import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { ASSET_TYPES } from "../constants/assets";
import { Tool } from "./Tool";
import { useTranslation } from "react-i18next";
import ICONS from "../constants/icons";
import { Icon } from "@iconify/react";
import useSettings from "../hooks/useSettings";
import playSound from "../utils/playSound";
import ProjectType from "../types/Project";

const Project = (project: ProjectType) => {
    const { settings } = useSettings();
    const { assets } = useAuth();
    const modalContainerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const images = [assets?.images[`${project.id}_${ASSET_TYPES.SCREENSHOT}_1`].src, assets?.images[`${project.id}_${ASSET_TYPES.SCREENSHOT}_2`].src, assets?.images[`${project.id}_${ASSET_TYPES.SCREENSHOT}_3`].src];
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

    let nameFirstPart: string | string[] = project.name.split(" ");
    const nameLastPart = nameFirstPart.pop();
    nameFirstPart = nameFirstPart.join(" ");

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
        setFullscreenImage(null);
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

    const handleImageClick = (index: number) => {
        const src = images[index - 1];
        playSound(assets?.sounds.click, settings);
        setCurrentImageIndex(index - 1);
        setFullscreenImage(src ?? '');
    };

    const closeFullscreenImage = () => {
        playSound(assets?.sounds.click, settings);
        setFullscreenImage(null);
        setCurrentImageIndex(null);
    };

    useEffect(() => {
        const handleArrowKeys = (e: KeyboardEvent) => {
            if (fullscreenImage === null || currentImageIndex === null) return;

            if (e.key === "ArrowRight") {
                const nextIndex = (currentImageIndex + 1) % images.length;
                setCurrentImageIndex(nextIndex);
                setFullscreenImage(images[nextIndex] ?? '');
            }

            if (e.key === "ArrowLeft") {
                const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
                setCurrentImageIndex(prevIndex);
                setFullscreenImage(images[prevIndex] ?? '');
            }
        };

        window.addEventListener("keydown", handleArrowKeys);
        return () => {
            window.removeEventListener("keydown", handleArrowKeys);
        };
    }, [fullscreenImage, currentImageIndex, images]);

    return (
        <>
            <div
                onClick={() => {
                    toggleModal();
                }}
                className="transitions outline outline-transparent hover:outline-secondary-400 hover:saturate-100 lg:saturate-0 cursor-pointer active:scale-90 flex flex-col items-center justify-center bg-primary-300 p-1.5 h-max w-max"
            >
                <img
                    src={
                        assets?.images[`${project.id}_${ASSET_TYPES.POSTER}`]?.src ?? ""
                    }
                    className="w-24 xl:w-28"
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
                        className="overflow-y-visible overflow-x-hidden bg-primary-500 h-[75vh] w-[85vw] sm:h-[75vh] sm:w-[70vw] max-w-[1000px] max-h-[600px] rounded-lg flex flex-col flex-wrap items-center justify-start px-6 py-4"
                    >
                        <div className="relative w-full h-max flex flex-col items-center justify-start gap-2 py-12 sm:py-8">
                            <img
                                src={
                                    assets?.images[`${project.id}_${ASSET_TYPES.LOGO}`]?.src ?? ""
                                }
                                className="w-13 h-13 object-contain"
                            />
                            <h3 className="text-center text-3xl uppercase font-light">
                                {nameFirstPart}{" "}
                                <span className="font-extrabold">{nameLastPart}</span>
                            </h3>
                            <div className="flex flex-col items-center justify-center gap-3">
                                <h4 className="text-center bg-secondary-900 text-secondary-300 px-2 py-0.5">
                                    {project.type}
                                </h4>
                                <div className="z-30 mb-8 flex flex-row items-center justify-center gap-8 flex-wrap sm:gap-3">
                                    {project.tools?.map((tool, index) => (
                                        <Tool key={`tool-${index}`} name={tool} />
                                    ))}
                                </div>
                            </div>
                            <div className="relative flex flex-row flex-wrap items-center justify-center gap-4">
                                <img
                                    onClick={() =>
                                        handleImageClick(1)
                                    }
                                    src={
                                        assets?.images[
                                            `${project.id}_${ASSET_TYPES.SCREENSHOT}_1`
                                        ]?.src ?? ""
                                    }
                                    className="transition-all duration-500 hover:brightness-50 active:scale-90 cursor-zoom-in w-36 xl:w-56"
                                />
                                <img
                                    onClick={() =>
                                        handleImageClick(2)
                                    }
                                    src={
                                        assets?.images[
                                            `${project.id}_${ASSET_TYPES.SCREENSHOT}_2`
                                        ]?.src ?? ""
                                    }
                                    className={`${project.id === '6' && 'xl:h-[116px] h-[75px]'} object-cover transition-all duration-500 hover:brightness-50 active:scale-90 cursor-zoom-in w-36 xl:w-56`}
                                />
                                <img
                                    onClick={() =>
                                        handleImageClick(3)
                                    }
                                    src={
                                        assets?.images[
                                            `${project.id}_${ASSET_TYPES.SCREENSHOT}_3`
                                        ]?.src ?? ""
                                    }
                                    className="transition-all duration-500 hover:brightness-50 active:scale-90 cursor-zoom-in w-36 xl:w-56"
                                />
                                <Icon icon={ICONS.CLICK_HERE} className="-rotate-12 w-6 h-5 text-white absolute top-[60%] right-[20%] 2sm:top-[105%] 2sm:right-[-3%]"></Icon>
                            </div>
                            <p className="mt-6 max-w-[95%] sm:max-w-[80%] text-sm text-center font-primary whitespace-pre-wrap break-words">
                                {project.description.split("**").map((part, index) => {
                                    const isHighlighted = index % 2 === 1;
                                    const hasPercent = part.includes("%");
                                    const hasAmpersand = part.includes("&");
                                    const hasDollar = part.includes("$");

                                    let highLightColor = "font-bold text-gray-200";

                                    if (hasPercent) {
                                        highLightColor = "bg-yellow-200/10 text-yellow-400";
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
                                                className={`inline break-words py-1 px-[1px] ${highLightColor}`}
                                            >
                                                {cleaned}
                                            </span>
                                        );
                                    }

                                    return <span key={index} className="inline">{part}</span>;
                                })}
                            </p>
                            {settings.showSkills && (
                                <div className="my-6 z-30 flex flex-row items-start justify-center gap-3 flex-wrap sm:gap-2">
                                    {project.skills && Object.values(project.skills).map((skill, index) => (
                                        <Tool key={`skill-${index}`} name={skill.title} description={skill.description} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {(project.url && project.url.length > 0) && (
                        <button
                            className="top-[102.5%] flex justify-center items-center gap-4 transitions absolute button-primary w-full"
                            onClick={() => {
                                playSound(assets?.sounds.click, settings);
                                window.open(project.url, "_blank");
                            }}
                        >
                            <Icon icon={ICONS.SEE}
                                className="text-black w-5" />
                            {t('project.see')}
                        </button>
                    )}
                </div>
            </div>

            {fullscreenImage && (
                <div
                    onClick={closeFullscreenImage}
                    className="transitions fixed z-50 top-0 left-0 w-screen h-screen bg-black/75 flex justify-center items-center cursor-zoom-out"
                >
                    <img
                        src={fullscreenImage}
                        className="transitions max-w-[90vw] max-h-[90vh] object-contain"
                    />
                </div>
            )}
        </>
    );
};

export default Project;
