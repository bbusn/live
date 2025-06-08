import { useTranslation } from "react-i18next";
import ICONS from "../constants/icons";
import { Icon } from "@iconify/react";

const WelcomePage = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-2">
            <Icon icon={ICONS.SIMPLE} className="w-28 h-14" />
            <h1>{t('welcome.title')}</h1>
            <p className="text-center">{t('welcome.description')}</p>
        </div>
    )
};

export default WelcomePage;
