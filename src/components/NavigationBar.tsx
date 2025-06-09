import ROUTES from "../constants/routes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import { Icon } from "@iconify/react";
import ICONS from "../constants/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const NavigationBar = () => {
    const { t } = useTranslation();
    const [active, setActive] = useState<string>(location.pathname);
    const { click } = useAuth();

    useEffect(() => {
        setActive(location.pathname);
    }, [location.pathname]);

    return (
        <nav className="h-full mb-4 sm:mb-0 sm:min-h-[85vh] py-8 flex flex-col items-center justify-start px-8">
            <Banner />
            <div className="flex flex-col justify-center items-start gap-1 my-3 sm:my-4 custom-width text-left text-sm sm:text-lg">
                <Link onClick={click} to={ROUTES.DASHBOARD} className={`active:scale-[85%] ${active === ROUTES.DASHBOARD ? 'bg-secondary-400 text-black font-semibold hover:bg-secondary-300' : 'hover:bg-primary-300 text-white'} flex justify-start pl-8 sm:pl-12 items-center gap-4 transitions rounded-md w-full py-2 sm:py-2.5`}>
                    <Icon className="font-bold" icon={ICONS.DASHBOARD} />
                    {t('navigation.dashboard')}
                </Link>
                <Link onClick={click} to={ROUTES.RESOURCES} className={`active:scale-[85%] ${active === ROUTES.RESOURCES ? 'bg-secondary-400 text-black font-semibold hover:bg-secondary-300' : 'hover:bg-primary-300 text-white'} flex justify-start pl-8 sm:pl-12 items-center gap-4 transitions rounded-md w-full py-2 sm:py-2.5`}>
                    <Icon className="font-bold" icon={ICONS.RESOURCES} />
                    {t('navigation.resources')}
                </Link>
                <Link onClick={click} to={ROUTES.SETTINGS} className={`active:scale-[85%] ${active === ROUTES.SETTINGS ? 'bg-secondary-400 text-black font-semibold hover:bg-secondary-300' : 'hover:bg-primary-300 text-white'} flex justify-start pl-8 sm:pl-12 items-center gap-4 transitions rounded-md w-full py-2 sm:py-2.5`}>
                    <Icon className="font-bold" icon={ICONS.SETTINGS} />
                    {t('navigation.settings')}
                </Link>
            </div>
        </nav>
    );
}

export default NavigationBar;