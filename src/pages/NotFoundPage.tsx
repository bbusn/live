import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
    const { t } = useTranslation();

    return (
        <div className={`sm:mt-16 mt-8 sm:mb-0 mb-20 transition-all duration-300 min-h-[300px] px-4 h-max flex flex-col gap-3 justify-center items-center w-full max-w-[95%] xs:w-md sm:w-md xl:w-xl`}>
            <p className="text-2xl font-semibold">{t('not_found.title')}</p>
            <p className="text-lg">{t('not_found.description')}</p>
        </div>
    );
};

export default NotFoundPage;