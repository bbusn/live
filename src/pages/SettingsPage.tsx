import { useTranslation } from "react-i18next";
import { useSettings } from "../hooks/useSettings";
import { useAuth } from "../hooks/useAuth";
import { ACHIEVEMENTS } from "../constants/achievements";
import { User } from "../objects/User";
import { useToasts } from "../hooks/useToasts";
import { STATUS } from "../constants/status";
import { playSound } from "../utils/sound";
import { encrypt } from "../utils/encrypt";
import { AUTH_TOKEN_ITEM_NAME } from "../utils/auth";

const SettingsPage = () => {
    const { settings, setSettings } = useSettings();
    const { t } = useTranslation();
    const { assets } = useAuth();
    const { toast } = useToasts();

    const toggleShowSkills = async () => {
        playSound(assets?.sounds.click)
        if (!User.getInstance().hasAchievement(ACHIEVEMENTS.SETTINGS_SHOW_SKILLS_FIRST_CLICK)) {
            toast({
                status: STATUS.ACHIEVEMENT,
                message: ACHIEVEMENTS.SETTINGS_SHOW_SKILLS_FIRST_CLICK,
            });
            User.getInstance().addAchievement(ACHIEVEMENTS.SETTINGS_SHOW_SKILLS_FIRST_CLICK);
            const encrypted = await encrypt(User.getInstance());
            localStorage.setItem(AUTH_TOKEN_ITEM_NAME, encrypted);
        }
        setSettings({ ...settings, showSkills: !settings.showSkills });

    };

    return (
        <div className={`transition-all duration-300 min-h-[300px] px-4 h-full w-full flex flex-col gap-8 justify-center items-center max-w-[95%] sm:w-2xl sm:max-w-full`}>
            <h2 className="text-4xl">{t('settings.title')}</h2>
            <label className="hover:opacity-100 transitions opacity-60 flex flex-col items-center gap-4 select-none cursor-pointer">
                <span>{t('settings.showSkills')}</span>
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