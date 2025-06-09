// import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { ProjectType, useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ROUTES from "../constants/routes";
import { useToasts } from "../hooks/useToasts";
import { STATUS } from "../constants/status";
import { useTranslation } from "react-i18next";
import Project from "../components/Project";

const DashboardPage = () => {
    const { assets } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToasts();
    const { t } = useTranslation();
    const projects = assets?.jsons?.projects || [];

    useEffect(() => {
        if (!projects || projects.length === 0) {
            toast({
                status: STATUS.ERROR,
                message: t('dashboard.error.assets'),
            })
            navigate(ROUTES.NOT_FOUND);
        }
    }, []);

    return (
        <div className="transition-all duration-300 flex flex-row flex-wrap items-center justify-evenly h-full min-h-[300px] px-4 w-full lg:max-w-3xl gap-2 2xs:gap-4 xs:gap-8 2xl:!gap-12">
            {projects.map((project: ProjectType, index: number) => (
                <Project key={`project-${index}`} {...project} />
            ))}
        </div>
    )
};

export default DashboardPage;
