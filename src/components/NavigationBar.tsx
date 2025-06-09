import ROUTES from "../constants/routes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import { Icon } from "@iconify/react";
import ICONS from "../constants/icons";

const NavigationBar = () => {
    const { t } = useTranslation();

    return (
        <nav className="h-full mb-4 sm:mb-0 sm:min-h-[85vh] py-8 flex flex-col items-center justify-start px-8">
            <Banner />
            <div className="flex flex-col justify-center items-start gap-1 my-2 sm:my-4 custom-width text-left text-sm sm:text-lg">
                <Link to={ROUTES.DASHBOARD} className="flex justify-start pl-8 sm:pl-12 items-center gap-4 transitions rounded-md w-full py-2 sm:py-2.5 text-white hover:bg-secondary-500">
                    <Icon className="font-bold" icon={ICONS.DASHBOARD} />
                    {t('navigation.dashboard')}
                </Link>
                <Link to={ROUTES.RESOURCES} className="flex justify-start pl-8 sm:pl-12 items-center gap-4 transitions rounded-md w-full py-2 sm:py-2.5 text-white hover:bg-secondary-500">
                    <Icon className="font-bold" icon={ICONS.RESOURCES} />
                    {t('navigation.resources')}
                </Link>
                <Link to={ROUTES.SETTINGS} className="flex justify-start pl-8 sm:pl-12 items-center gap-4 transitions rounded-md w-full py-2 sm:py-2.5 text-white hover:bg-secondary-500">
                    <Icon className="font-bold" icon={ICONS.SETTINGS} />
                    {t('navigation.settings')}
                </Link>
            </div>
        </nav>
    );
}

export default NavigationBar;