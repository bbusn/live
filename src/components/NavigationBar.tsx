import { useEffect } from "react";
import { AUTH_STATUS } from "../utils/auth";
import ROUTES from "../constants/routes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
    const { t } = useTranslation();

    return (
        <nav className="flex items-center justify-between p-4 bg-primary-500">
            <div className="text-white font-bold text-lg">
                {t('navigation.title')}
            </div>
            <div className="flex space-x-4">
                <Link to={ROUTES.DASHBOARD} className="text-white hover:text-secondary-500">{t('navigation.dashboard')}</Link>
                <Link to={ROUTES.RESOURCES} className="text-white hover:text-secondary-500">{t('navigation.resources')}</Link>
                <Link to={ROUTES.SETTINGS} className="text-white hover:text-secondary-500">{t('navigation.settings')}</Link>
            </div>
        </nav>
    );
}