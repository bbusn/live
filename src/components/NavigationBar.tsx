import ROUTES from "../constants/routes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import { Icon } from "@iconify/react";
import ICONS from "../constants/icons";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import playSound from "../utils/playSound";
import useSettings from "../hooks/useSettings";
import { isMusicPlaying, playMusic } from "../utils/musicManager";

const NavigationBar = () => {
    const { t } = useTranslation();
    const { assets } = useAuth();
    const [active, setActive] = useState<string>(location.pathname);
    const [firstClick, setFirstClick] = useState(false);
    const { settings } = useSettings();

    const startMusic = () => {
        if (firstClick || isMusicPlaying()) return;

        playMusic(assets?.sounds.music.src);
        setFirstClick(true);
    };

    useEffect(() => {
        if (firstClick || !assets) return;
        if (isMusicPlaying()) return;
        if (!settings.enableMusic) return;

        const handleFirstClick = () => {
            startMusic();
            window.removeEventListener("click", handleFirstClick);
        };

        window.addEventListener("click", handleFirstClick);
        return () => {
            window.removeEventListener("click", handleFirstClick);
        };
    }, [firstClick, assets]);

    useEffect(() => {
        setActive(location.pathname);
    }, [location.pathname]);

    return (
        <nav className="h-full mb-4 sm:mb-0 sm:min-h-[85vh] py-8 flex flex-col items-center justify-start px-8">
            <Banner />
            <div className="flex flex-col justify-center items-start gap-1 my-3 sm:my-4 custom-width text-left text-sm sm:text-lg">
                <Link onClick={() => playSound(assets?.sounds.click, settings)} to={ROUTES.DASHBOARD} className={`active:scale-[85%] ${active === ROUTES.DASHBOARD ? 'bg-secondary-400 text-black font-semibold hover:bg-secondary-300' : 'hover:bg-primary-300 text-white'} flex justify-start pl-8 sm:pl-12 items-center gap-4 transitions rounded-md w-full py-2 sm:py-2.5`}>
                    <Icon className="font-bold" icon={ICONS.DASHBOARD} />
                    {t('navigation.dashboard')}
                </Link>
                <Link onClick={() => playSound(assets?.sounds.click, settings)} to={ROUTES.RESOURCES} className={`active:scale-[85%] ${active === ROUTES.RESOURCES ? 'bg-secondary-400 text-black font-semibold hover:bg-secondary-300' : 'hover:bg-primary-300 text-white'} flex justify-start pl-8 sm:pl-12 items-center gap-4 transitions rounded-md w-full py-2 sm:py-2.5`}>
                    <Icon className="font-bold" icon={ICONS.RESOURCES} />
                    {t('navigation.resources')}
                </Link>
                <Link onClick={() => playSound(assets?.sounds.click, settings)} to={ROUTES.SETTINGS} className={`active:scale-[85%] ${active === ROUTES.SETTINGS ? 'bg-secondary-400 text-black font-semibold hover:bg-secondary-300' : 'hover:bg-primary-300 text-white'} flex justify-start pl-8 sm:pl-12 items-center gap-4 transitions rounded-md w-full py-2 sm:py-2.5`}>
                    <Icon className="font-bold" icon={ICONS.SETTINGS} />
                    {t('navigation.settings')}
                </Link>
            </div>
        </nav >
    );
}

export default NavigationBar;