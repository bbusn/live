import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-[95%] sm:w-2xl sm:max-w-full  flex flex-col items-center justify-center h-full w-full gap-2">
            <h1>{t('not_found.title')}</h1>
            <p className="text-center">{t('not_found.description')}</p>
        </div>
    )
};

export default NotFoundPage;
