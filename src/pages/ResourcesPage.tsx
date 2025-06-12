import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../constants/routes";
import useToasts from "../hooks/useToasts";
import STATUS from "../constants/status";
import { useTranslation } from "react-i18next";
import Resource from "../components/Resource";
import ResourceType from "../types/Resource";

const ResourcesPage = () => {
    const navigate = useNavigate();
    const { toast } = useToasts();
    const { t } = useTranslation();
    const resources = t('resources', { returnObjects: true }) as ResourceType[];

    useEffect(() => {
        if (!resources || resources.length === 0) {
            toast({
                status: STATUS.ERROR,
                message: t('dashboard.error.assets'),
            })
            navigate(ROUTES.NOT_FOUND);
        }
    }, []);

    return (
        <div className={`sm:mt-16 mt-8 mb-64 lg:mb-0 transition-all duration-300 flex flex-row flex-wrap items-center justify-evenly h-max min-h-[300px] px-4 w-full max-w-[95%] xs:w-md sm:w-md xl:w-xl gap-2 2xs:gap-4 xs:gap-8 sm:gap-12`}>
            {resources.map((resource: ResourceType, index: number) => (
                <Resource key={`resource-${index}`} {...resource} />
            ))}
        </div>
    )
};

export default ResourcesPage;
