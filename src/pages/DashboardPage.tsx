import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../constants/routes";
import useToasts from "../hooks/useToasts";
import STATUS from "../constants/status";
import { useTranslation } from "react-i18next";
import Project from "../components/Project";
import ProjectType from "../types/Project";

const DashboardPage = () => {
    const navigate = useNavigate();
    const { toast } = useToasts();
    const { t } = useTranslation();
    const projects = t('projects', { returnObjects: true }) as ProjectType[];

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
        <div className={`sm:mt-16 mt-8 mb-20 sm:mb-0 transition-all duration-300 flex flex-row flex-wrap items-start justify-evenly h-max min-h-[300px] px-4 w-full max-w-[95%] sm:w-2xl sm:max-w-full gap-2 2xs:gap-4 xs:gap-8 2xl:!gap-12`}>
            {projects.map((project: ProjectType, index: number) => (
                <Project key={`project-${index}`} {...project} />
            ))}
        </div>
    )
};

export default DashboardPage;
