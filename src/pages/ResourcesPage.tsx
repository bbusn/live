import { useTranslation } from "react-i18next";

const ResourcesPage = () => {
    const { t } = useTranslation();

    return (
        <div className={`sm:mt-16 mt-8 sm:mb-0 mb-20 transition-all duration-300 min-h-[300px] px-4 h-max w-full flex flex-col gap-8 justify-start items-center max-w-[95%] sm:w-2xl sm:max-w-full`}>
            <h2 className="text-4xl">{t('resources.title')}</h2>
        </div>
    );
};

export default ResourcesPage;