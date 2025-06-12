import { useTranslation } from "react-i18next";
import { useSettings } from "../hooks/useSettings";
import { useAuth } from "../hooks/useAuth";
import { ACHIEVEMENTS } from "../constants/achievements";
import { User } from "../objects/User";
import { useToasts } from "../hooks/useToasts";
import { STATUS } from "../constants/status";
import { playSound } from "../utils/sound";
import LanguageSelector from "../components/LangageSelector";
import { useRef, useState } from "react";

const SettingsPage = () => {
    const { settings, setSettings } = useSettings();
    const [clicks, setClicks] = useState<number>(1);
    const quitRef = useRef<HTMLButtonElement>(null);
    const { t } = useTranslation();
    const { assets } = useAuth();
    const { toast } = useToasts();

    const toggleShowSkills = async () => {
        playSound(assets?.sounds.click)
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

    const handleQuit = () => {
        setClicks(clicks + 1);
        playSound(assets?.sounds.click)


        if (clicks <= 18) {
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

        if (quitRef.current) {
            quitRef.current.remove();
        }

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
        <div className={`sm:mt-20 mt-8 sm:mb-0 mb-20 transition-all duration-300 min-h-[300px] px-4 h-max w-full flex flex-col gap-8 justify-start items-center max-w-[95%] sm:w-2xl sm:max-w-full`}>
            <div className="flex flex-row justify-center items-center gap-8 flex-wrap w-full">
                <button ref={quitRef} onClick={() => handleQuit()} className="active:scale-95 cursor-pointer max-w-[250px] rounded-md w-full transition-all duration-75 hover:duration-200 hover:transition-all active:duration-75 active:transition-all py-2.5 px-4 bg-[#d84a4c] text-black font-semibold hover:brightness-75">
                    {t('settings.quit.button')}
                </button>
                <button onClick={() => {
                    playSound(assets?.sounds.click)
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

            <label className="mt-8 hover:opacity-100 transitions opacity-60 flex flex-col items-center gap-4 select-none cursor-pointer">
                <span className="text-center">{t('settings.show_skills')}</span>
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
                absolute -translate-x-1/2 top-1/2 -translate-y-1/2 w-[27.5%] h-[70%] bg-black/70 rounded-md shadow-md transition-all duration-300
                ${settings.showSkills ? 'left-[80%]' : 'left-[20%]'}
              `}
                    />
                </div>
            </label>
        </div>
    );
};

export default SettingsPage;