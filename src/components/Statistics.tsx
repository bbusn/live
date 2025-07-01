import { useEffect, useRef, useState } from "react";
import User from "../objects/User";
import { useTranslation } from "react-i18next";
import formatTimeDiff from "../utils/formatTimeDiff";
import { ACHIEVEMENTS, ACHIEVEMENTS_COUNT, ACHIEVEMENTS_DONATIONS, ACHIEVEMENTS_TIME } from "../constants/achievements";
import STATUS from "../constants/status";
import useToasts from "../hooks/useToasts";
import { TASKS } from "../constants/tasks";
import useTasks from "../hooks/useTasks";

const Statistics = () => {
    const user = User.getInstance();
    const { t } = useTranslation();
    const { toast } = useToasts();
    const { setTasks, setTasksCollapsed } = useTasks();

    const [viewers, setViewers] = useState(user.viewers);
    const [donations, setDonations] = useState(user.donations);
    const [achievementsUnlocked, setAchievementsUnlocked] = useState(user.achievements.length);
    const [now, setNow] = useState(new Date());

    const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const latestToastRef = useRef<any>(null);

    const queueToast = (data: any) => {
        latestToastRef.current = data;
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);

        toastTimeoutRef.current = setTimeout(() => {
            if (latestToastRef.current) {
                toast(latestToastRef.current);
                latestToastRef.current = null;
            }
        }, 100);
    };

    const unlockTask = (taskName: string) => {
        if (!user.isTaskChecked(TASKS[taskName as keyof typeof TASKS])) {
            const random = Math.floor(Math.random() * 2) + 40;
            const newViewers = Math.max(0, user.viewers + random);
            user.updateViewers(newViewers);

            setTasks(user.tasks.map(task =>
                task.name === TASKS[taskName as keyof typeof TASKS]
                    ? { ...task, checked: true }
                    : task
            ));
            queueToast({
                status: STATUS.TASK,
                message: TASKS[taskName as keyof typeof TASKS],
                viewersAmount: random,
            });
            setTasksCollapsed(false);
        }
    };

    useEffect(() => {
        const timeAchievements = Object.keys(ACHIEVEMENTS).filter(key => key.startsWith('TIME'));
        const donationsAchievements = Object.keys(ACHIEVEMENTS).filter(key => key.startsWith('DONATIONS'));

        const updateState = () => {
            setViewers(user.viewers);
            setDonations(user.donations);
            setAchievementsUnlocked(user.achievements.length);
            setNow(new Date());
        };

        const handleTimeAchievements = async () => {
            const now = new Date();
            const started = new Date(user.started_at);

            for (const key of timeAchievements) {
                const achievementKey = ACHIEVEMENTS[key as keyof typeof ACHIEVEMENTS];
                if (user.hasAchievement(achievementKey)) continue;

                const timeLimit = ACHIEVEMENTS_TIME[achievementKey as keyof typeof ACHIEVEMENTS_TIME];
                if (timeLimit && now.getTime() - started.getTime() >= timeLimit) {
                    await user.addAchievement(achievementKey);
                    const donationsAmount = timeLimit / 10000;
                    queueToast({
                        status: STATUS.ACHIEVEMENT,
                        message: achievementKey,
                        donationsAmount,
                    });
                    user.addDonation(donationsAmount);
                }
            }
        };

        const handleDonationsAchievements = async () => {
            for (const key of donationsAchievements) {
                const achievementKey = ACHIEVEMENTS[key as keyof typeof ACHIEVEMENTS];
                if (user.hasAchievement(achievementKey)) continue;

                const requiredDonations = ACHIEVEMENTS_DONATIONS[achievementKey as keyof typeof ACHIEVEMENTS_DONATIONS];
                if (requiredDonations && user.donations >= requiredDonations) {
                    await user.addAchievement(achievementKey);
                    queueToast({
                        status: STATUS.ACHIEVEMENT,
                        message: achievementKey,
                        donationsAmount: requiredDonations / 10,
                    });
                    user.addDonation(requiredDonations / 2);

                    if (key === ACHIEVEMENTS.DONATIONS_100_EUROS) {
                        unlockTask(TASKS.EARN_100_EUROS);
                    }
                }
            }
        };

        const handleLastConnected = async () => {
            const now = new Date();
            const lastConnected = user.last_connected_at;
            const diff = now.getTime() - lastConnected.getTime();

            if (diff > 3600_000) {
                user.updateViewers(Math.floor(Math.random() * 10) + 1);
                setTimeout(() => {
                    queueToast({
                        status: STATUS.MESSAGE,
                        message: t('statistics.last_connected_at.message.long'),
                    });
                }, 3500);
                setTimeout(() => {
                    localStorage.clear();
                    window.location.reload();
                }, 3500);
            } else if (diff > 5 * 60_000) {
                const newViewers = Math.max(0, user.viewers - Math.floor(Math.random() * user.viewers + 1));
                user.updateViewers(newViewers);
                queueToast({
                    status: STATUS.MESSAGE,
                    message: t(`statistics.last_connected_at.message.${newViewers > 1 ? "multiple" : "unique"}`),
                });
            }

            user.updateLastConnectedAt(now);
        };

        const updateRandomViewers = () => {
            const delta = Math.floor(Math.random() * 8) - 3;
            const newViewers = Math.max(0, user.viewers + delta);
            user.updateViewers(newViewers);
            setViewers(newViewers);
        };
        const minInterval = 300;
        const maxInterval = 2600;
        const viewersFactor = Math.max(1, user.viewers);
        const intervalDuration = Math.max(
            minInterval,
            maxInterval - Math.min(viewersFactor * 10, maxInterval - minInterval)
        );
        const viewersInterval = setInterval(updateRandomViewers, intervalDuration);

        const clockInterval = setInterval(updateState, 1000);
        const achievementInterval = setInterval(async () => {
            await handleLastConnected();

            handleTimeAchievements();
            handleDonationsAchievements();
        }, 2000);

        return () => {
            clearInterval(clockInterval);
            clearInterval(achievementInterval);
            clearInterval(viewersInterval);
            if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        };
    }, [t]);

    const started = new Date(user.started_at);

    return (
        <div className="flex border border-transparent hover:border-secondary-400 flex-row shadow-lg rounded-sm justify-evenly gap-3 flex-wrap sm:flex-nowrap items-center transitions statistics sm:h-20 px-1 py-3 w-full max-w-[85%] xs:max-w-[350px] sm:max-w-[450px] sm:top-5 sm:left-[55%] sm:-translate-x-1/2 sm:absolute bg-primary-500">
            <div className="group transitions hover:brightness-125 active:scale-95 flex flex-col justify-center items-center px-2.5 sm:px-4 w-24 sm:w-[120px] h-12 rounded-sm bg-primary-300">
                <span className="leading-4 text-lg text-left w-full">{formatTimeDiff(now, started)}</span>
                <span className="text-xs leading-3.5 text-white/60 text-left w-full">{t('statistics.time')}</span>
            </div>
            <div className="group transitions hover:brightness-125 active:scale-95 flex flex-col justify-center items-center w-24 px-2.5 sm:px-4 truncate sm:w-[120px] h-12 rounded-sm bg-primary-300">
                <span className="leading-4 text-lg text-left w-full">{viewers}</span>
                <span className="text-xs leading-3.5 text-white/60 text-left w-full">{t('statistics.viewers')}</span>
            </div>
            <div className="group transitions hover:brightness-125 active:scale-95 flex flex-col justify-center items-center w-24 px-2.5 sm:px-4 truncate sm:w-[120px] h-12 rounded-sm bg-primary-300">
                <span className="leading-4 text-lg text-left w-full">{donations}€</span>
                <span className="text-xs leading-3.5 text-white/60 text-left w-full">
                    {t('statistics.donations')} {achievementsUnlocked}/{ACHIEVEMENTS_COUNT}
                </span>
            </div>
        </div>
    );
};

export default Statistics;