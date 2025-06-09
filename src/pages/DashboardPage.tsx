// import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
    // const { t } = useTranslation();
    const { assets } = useAuth();

    return (
        <div className="transition-all duration-300 flex flex-col items-center justify-center h-full w-full gap-4 sm:gap-6">
            <img src={assets?.images.tv.src} className="w-24" />
        </div>
    )
};

export default DashboardPage;
