import { useTranslation } from "react-i18next";
import useSettings from "../hooks/useSettings";
import useAuth from "../hooks/useAuth";
import { ACHIEVEMENTS } from "../constants/achievements";
import User from "../objects/User";
import useToasts from "../hooks/useToasts";
import STATUS from "../constants/status";
import playSound from "../utils/playSound";
import LanguageSelector from "../components/LangageSelector";
import { useRef, useState } from "react";
import MaxSize from "../components/MaxSize";
import { isMusicPlaying, playMusic, stopMusic } from "../utils/musicManager";

const SettingsPage = () => {
    const { settings, setSettings } = useSettings();
    const [clicks, setClicks] = useState<number>(User.getInstance().hasAchievement(ACHIEVEMENTS.SETTINGS_TRY_TO_QUIT) ? 20 : 1);
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(document.fullscreenElement !== null);
    const quitRef = useRef<HTMLButtonElement>(null);
    const { t } = useTranslation();
    const { assets } = useAuth();
    const { toast } = useToasts();

    const toggleShowSkills = async () => {
        playSound(assets?.sounds.click, settings);
        if (!User.getInstance().hasAchievement(ACHIEVEMENTS.SETTINGS_SHOW_SKILLS_FIRST_CLICK)) {
            const donationsAmount = Math.floor(Math.random() * 2) + 1;
            toast({
                status: STATUS.ACHIEVEMENT,
                message: ACHIEVEMENTS.SETTINGS_SHOW_SKILLS_FIRST_CLICK,
                donationsAmount: donationsAmount,
            });
            User.getInstance().addDonation(donationsAmount);
            await User.getInstance().addAchievement(ACHIEVEMENTS.SETTINGS_SHOW_SKILLS_FIRST_CLICK);
        }
        setSettings({ ...settings, showSkills: !settings.showSkills });
    };

    const toggleFullscreen = async () => {
        if (isIos) return;

        playSound(assets?.sounds.click, settings);
        if (isFullscreen) {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                await (document as any).webkitExitFullscreen();
            } else if ((document as any).mozCancelFullScreen) {
                await (document as any).mozCancelFullScreen();
            } else if ((document as any).msExitFullscreen) {
                await (document as any).msExitFullscreen();
            }
        } else {
            if (document.documentElement.requestFullscreen) {
                await document.documentElement.requestFullscreen();
            } else if ((document as any).documentElement.webkitRequestFullscreen) {
                await (document as any).documentElement.webkitRequestFullscreen();
            } else if ((document as any).documentElement.mozRequestFullScreen) {
                await (document as any).documentElement.mozRequestFullScreen();
            } else if ((document as any).documentElement.msRequestFullscreen) {
                await (document as any).documentElement.msRequestFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    }


    const toggleSettings = async (key: keyof typeof settings) => {
        playSound(assets?.sounds.click, settings);

        if (key === 'enableMusic') {
            if (!settings.enableMusic) {
                if (!isMusicPlaying()) {
                    playMusic(assets?.sounds?.music.src);
                }
            } else {
                stopMusic();
            }
        }

        setSettings({
            ...settings,
            [key]: !settings[key],
        });
    };

    const handleQuit = () => {
        setClicks(clicks + 1);
        playSound(assets?.sounds.click, settings);


        if (clicks <= 13) {
            toast({
                status: STATUS.INFO,
                message: t('settings.quit.message.' + clicks),
            });

            if (clicks < 2) return;

            if (quitRef.current) {
                quitRef.current.classList.add('fixed');
                quitRef.current.classList.add('z-40');
                const button = quitRef.current;
                const buttonRect = button.getBoundingClientRect();
                const padding = 10;

                const maxTop = Math.max(window.innerHeight - buttonRect.height - padding, padding);
                const maxLeft = Math.max(window.innerWidth - buttonRect.width - padding, padding);

                const top = Math.floor(Math.random() * (maxTop - padding + 1)) + padding;
                const left = Math.floor(Math.random() * (maxLeft - padding + 1)) + padding;

                button.style.position = 'fixed';
                button.style.top = `${top}px`;
                button.style.left = `${left}px`;
            }
            return
        }

        toast({
            status: STATUS.SUCCESS,
            message: t('settings.quit.message.' + clicks),
        });


        setTimeout(async () => {
            if (!User.getInstance().hasAchievement(ACHIEVEMENTS.SETTINGS_TRY_TO_QUIT)) {
                const donationsAmount = Math.floor(Math.random() * 6) + 1;
                toast({
                    status: STATUS.ACHIEVEMENT,
                    message: ACHIEVEMENTS.SETTINGS_TRY_TO_QUIT,
                    donationsAmount: donationsAmount,
                });
                User.getInstance().addDonation(donationsAmount);
                await User.getInstance().addAchievement(ACHIEVEMENTS.SETTINGS_TRY_TO_QUIT);
            }
        }, 1500);
    }

    return (
        <div className={`sm:mt-20 mt-8 lg:mb-0 mb-64 transition-all duration-300 min-h-[300px] px-4 h-max flex flex-col gap-8 justify-start items-center w-full max-w-[95%] xs:w-md sm:w-md xl:w-xl`}>
            <div className="flex flex-row justify-center items-center gap-8 flex-wrap w-full">
                {clicks <= 14 && (
                    <button ref={quitRef} onClick={() => handleQuit()} className="active:scale-95 cursor-pointer max-w-[250px] rounded-md w-full transition-all duration-75 hover:duration-200 hover:transition-all active:duration-75 active:transition-all py-2.5 px-4 bg-[#d84a4c] text-black font-semibold hover:brightness-75">
                        {t('settings.quit.button')}
                    </button>
                )}
                <button onClick={() => {
                    playSound(assets?.sounds.click, settings);
                    localStorage.clear();
                    toast({
                        status: STATUS.SUCCESS,
                        message: t(`settings.restart.message.${(Math.floor(Math.random() * 5) + 1).toString()}`),
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }} className="active:scale-[90%] cursor-pointer max-w-[250px] rounded-md w-full transitions py-2.5 px-4 bg-gray-200 text-black font-semibold hover:bg-gray-400">
                    {t('settings.restart.button')}
                </button>
            </div>
            <LanguageSelector />
            <div className="mt-8 flex flex-row flex-wrap items-start justify-center gap-8">
                {!isIos && (
                    <label className="hover:opacity-100 transitions opacity-60 flex flex-col justify-start items-center gap-2 select-none cursor-pointer">
                        <span className="max-w-64 h-6 text-center"><MaxSize value={t('settings.enable_fullscreen')} size={30} /></span>
                        <div
                            onClick={() => toggleFullscreen()}
                            className={`
              relative w-20 h-[30px] rounded-lg flex justify-center items-center cursor-pointer transition-all duration-300 active:scale-90 select-none
              ${isFullscreen
                                    ? 'bg-secondary-300'
                                    : 'bg-gray-300'
                                }
            `}
                        >
                            <div
                                className={`
                absolute -translate-x-1/2 top-1/2 -translate-y-1/2 w-[27.5%] h-[70%] bg-black/75 rounded-md shadow-md transition-all duration-300
                ${isFullscreen ? 'left-[80%]' : 'left-[20%]'}
              `}
                            />
                        </div>
                    </label>
                )}
                <label className="hover:opacity-100 transitions opacity-60 flex flex-col justify-start items-center gap-2 select-none cursor-pointer">
                    <span className="max-w-64 h-6 text-center"><MaxSize value={t('settings.enable_music')} size={30} /></span>
                    <div
                        onClick={() => toggleSettings('enableMusic')}
                        className={`
              relative w-20 h-[30px] rounded-lg flex justify-center items-center cursor-pointer transition-all duration-300 active:scale-90 select-none
              ${settings.enableMusic
                                ? 'bg-secondary-300'
                                : 'bg-gray-300'
                            }
            `}
                    >
                        <div
                            className={`
                absolute -translate-x-1/2 top-1/2 -translate-y-1/2 w-[27.5%] h-[70%] bg-black/75 rounded-md shadow-md transition-all duration-300
                ${settings.enableMusic ? 'left-[80%]' : 'left-[20%]'}
              `}
                        />
                    </div>
                </label>
                <label className="hover:opacity-100 transitions opacity-60 flex flex-col justify-start items-center gap-2 select-none cursor-pointer">
                    <span className="max-w-64 h-6 text-center"><MaxSize value={t('settings.enable_sound_effects')} size={30} /></span>
                    <div
                        onClick={() => toggleSettings('enableSoundEffects')}
                        className={`
              relative w-20 h-[30px] rounded-lg flex justify-center items-center cursor-pointer transition-all duration-300 active:scale-90 select-none
              ${settings.enableSoundEffects
                                ? 'bg-secondary-300'
                                : 'bg-gray-300'
                            }
            `}
                    >
                        <div
                            className={`
                absolute -translate-x-1/2 top-1/2 -translate-y-1/2 w-[27.5%] h-[70%] bg-black/75 rounded-md shadow-md transition-all duration-300
                ${settings.enableSoundEffects ? 'left-[80%]' : 'left-[20%]'}
              `}
                        />
                    </div>
                </label>
                <label className="hover:opacity-100 transitions opacity-60 flex flex-col justify-start items-center gap-2 select-none cursor-pointer">
                    <span className="max-w-64 h-12 text-center">{t('settings.show_skills')}</span>
                    <div
                        onClick={toggleShowSkills}
                        className={`
              relative w-20 h-[30px] rounded-lg flex justify-center items-center cursor-pointer transition-all duration-300 active:scale-90 select-none
              ${settings.showSkills
                                ? 'bg-secondary-300'
                                : 'bg-gray-300'
                            }
            `}
                    >
                        <div
                            className={`
                absolute -translate-x-1/2 top-1/2 -translate-y-1/2 w-[27.5%] h-[70%] bg-black/75 rounded-md shadow-md transition-all duration-300
                ${settings.showSkills ? 'left-[80%]' : 'left-[20%]'}
              `}
                        />
                    </div>
                </label>
            </div>
        </div>
    );
};

export default SettingsPage;