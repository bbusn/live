import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../constants/routes";
import useToasts from "../hooks/useToasts";
import STATUS from "../constants/status";
import { useTranslation } from "react-i18next";
import Project from "../components/Project";
import ProjectType from "../types/Project";
import useTasks from "../hooks/useTasks";
import User from "../objects/User";
import { TASKS } from "../constants/tasks";
import { ACHIEVEMENTS } from "../constants/achievements";

const DashboardPage = () => {
    const navigate = useNavigate();
    const { toast } = useToasts();
    const { t } = useTranslation();
    const user = User.getInstance();
    const { setTasksCollapsed, setTasks } = useTasks();
    const projects = t('projects', { returnObjects: true }) as ProjectType[];

    const [clickedProjects, setClickedProjects] = useState<Set<string>>(new Set());

    const handleProjectClick = (id: string) => {
        setClickedProjects(prev => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
        });
    };

    useEffect(() => {
        if (clickedProjects.size === 2) {
            if (!User.getInstance().isTaskChecked(TASKS.OPEN_2_PROJECTS)) {
                const viewers = user.viewers;
                const random = Math.floor(Math.random() * 2) + 1 * 40;
                const newViewers = viewers + random < 0 ? 0 : viewers + random;
                user.updateViewers(newViewers);
                setTasks(
                    user.tasks.map(task =>
                        task.name === TASKS.OPEN_2_PROJECTS
                            ? { ...task, checked: true }
                            : task
                    )
                );
                toast({
                    status: STATUS.TASK,
                    message: TASKS.OPEN_2_PROJECTS,
                    viewersAmount: Math.floor(Math.random() * 2) + 1 * 40,
                });
                setTasksCollapsed(false);
            }
        } else if (clickedProjects.size > 5) {
            if (user.hasAchievement(ACHIEVEMENTS.PROJECTS_ALL_OPENED)) return;

            (async () => {
                await user.addAchievement(ACHIEVEMENTS.PROJECTS_ALL_OPENED);
                const donationsAmount = Math.floor(Math.random() * 40) + 1;
                toast({
                    status: STATUS.ACHIEVEMENT,
                    message: ACHIEVEMENTS.PROJECTS_ALL_OPENED,
                    donationsAmount: donationsAmount,
                });
                user.addDonation(donationsAmount);
            })();
        }
    }, [clickedProjects]);

    useEffect(() => {
        if (!projects || projects.length === 0) {
            toast({
                status: STATUS.MESSAGE,
                message: t('dashboard.error.assets'),
            })
            navigate(ROUTES.NOT_FOUND);
        }
    }, []);

    return (
        <div className={`sm:mt-16 mt-8 mb-64 lg:mb-0 transition-all duration-300 flex flex-row flex-wrap items-start justify-evenly h-max min-h-[300px] px-4 w-full max-w-[95%] xs:w-md sm:w-md xl:w-xl gap-2 2xs:gap-4 xs:gap-8 2xl:!gap-12`}>
            {projects.map((project, index) => (
                <Project key={`project-${index}`} {...project} onClickProject={() => handleProjectClick(project.id)} />
            ))}
        </div>
    )
};

export default DashboardPage;
