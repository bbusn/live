import { useEffect, useState } from "react";
import User from "../objects/User";
import { useTranslation } from "react-i18next";
import formatTimeDiff from "../utils/formatTimeDiff";
import { ACHIEVEMENTS, ACHIEVEMENTS_TIME } from "../constants/achievements";
import STATUS from "../constants/status";
import useToasts from "../hooks/useToasts";

const Statistics = () => {
    const user = User.getInstance();
    const { t } = useTranslation();
    const { toast } = useToasts();
    const [viewers, setViewers] = useState(user.viewers);
    const [donations, setDonations] = useState(user.donations);
    const [datetime, setDatetime] = useState(new Date(user.started_at));
    const [now, setNow] = useState(new Date());
    const timeAchievements = Object.keys(ACHIEVEMENTS).filter(key => key.startsWith('TIME'));

    useEffect(() => {
        const clockInterval = setInterval(() => {
            setViewers(user.viewers);
            setDonations(user.donations);
            setDatetime(new Date(user.started_at));
            setNow(new Date());
        }, 1000);

        const achievementsInterval = setInterval(async () => {
            const now = new Date();
            const datetime = new Date(user.started_at);

            timeAchievements.forEach(element => async () => {
                const achievementKey = ACHIEVEMENTS[element as keyof typeof ACHIEVEMENTS];
                if (user.hasAchievement(achievementKey)) return;

                const timeDiff = Math.abs(now.getTime() - datetime.getTime());
                const timeLimit = ACHIEVEMENTS_TIME[achievementKey as keyof typeof ACHIEVEMENTS_TIME];

                if (
                    Object.prototype.hasOwnProperty.call(ACHIEVEMENTS_TIME, achievementKey) &&
                    timeDiff >= timeLimit
                ) {
                    await user.addAchievement(achievementKey);
                    const donationsAmount = ACHIEVEMENTS_TIME[achievementKey as keyof typeof ACHIEVEMENTS_TIME] / 10000;
                    toast({
                        status: STATUS.ACHIEVEMENT,
                        message: achievementKey,
                        donationsAmount: donationsAmount,
                    });
                    user.addDonation(donationsAmount);
                }
            });
        }, 30000);

        const lastConnectedInterval = setInterval(() => {

            const now = new Date();

            const timeDiff = Math.abs(now.getTime() - user.last_connected_at.getTime());

            if (timeDiff > 1000 * 60 * 60) {
                user.updateViewers(Math.floor(Math.random() * 10) + 1);
                setTimeout(() => {
                    toast({
                        status: STATUS.INFO,
                        message: t('statistics.last_connected_at.message.long'),
                    });
                }, 3500);
                setTimeout(() => {
                    localStorage.clear();
                    window.location.reload();
                }, 3500);
            } else if (timeDiff > 1000 * 60 * 5) {
                const viewers = user.viewers;
                if (viewers > 1) {
                    const newViewers = viewers - Math.floor((Math.random() * viewers) + 1);
                    user.updateViewers(newViewers < 0 ? 0 : newViewers);
                    toast({
                        status: STATUS.INFO,
                        message: t('statistics.last_connected_at.message.multiple'),
                    });
                } else {
                    user.updateViewers(0);
                    toast({
                        status: STATUS.INFO,
                        message: t('statistics.last_connected_at.message.unique'),
                    });
                }
            }

            user.updateLastConnectedAt(new Date());
        }, 5000);

        const viewersInterval = setInterval(() => {
            const variation = Math.floor(Math.random() * 7) - 3;
            const viewers = user.viewers;
            const newViewers = Math.max(0, viewers + variation)

            user.updateViewers(newViewers);
            setViewers(newViewers);
        }, Math.floor(Math.random() * 2200) + 400);


        return () => {
            clearInterval(clockInterval);
            clearInterval(achievementsInterval);
            clearInterval(lastConnectedInterval);
            clearInterval(viewersInterval);

        }
    }, []);


    return (
        <div className="flex border border-transparent hover:border-secondary-400 flex-row shadow-lg rounded-sm justify-evenly gap-3 flex-wrap sm:flex-nowrap items-center transitions statistics sm:h-20 px-1 py-3 w-full max-w-[85%] xs:max-w-[350px] sm:max-w-[450px] sm:top-5 sm:left-[55%] sm:-translate-x-1/2 sm:absolute bg-primary-500">
            <div className="group transitions hover:brightness-125 active:scale-95 flex flex-col justify-center items-center px-2.5 sm:px-4 w-24 sm:w-[120px] h-12 rounded-sm bg-primary-300">
                <span className="leading-4 text-lg text-left w-full">
                    {formatTimeDiff(now, datetime)}
                </span>
                <span className="text-xs leading-3.5 text-white/60 text-left w-full">
                    {t('statistics.time')}
                </span>
            </div>
            <div className="group transitions hover:brightness-125 active:scale-95 flex flex-col justify-center items-center w-24 px-2.5 sm:px-4 truncate sm:w-[120px] h-12 rounded-sm bg-primary-300">
                <span className="leading-4 text-lg text-left w-full">{viewers}</span>
                <span className="text-xs leading-3.5 text-white/60 text-left w-full">
                    {t('statistics.viewers')}
                </span>
            </div>
            <div className="group transitions hover:brightness-125 active:scale-95 flex flex-col justify-center items-center w-24 px-2.5 sm:px-4 truncate sm:w-[120px] h-12 rounded-sm bg-primary-300">
                <span className="leading-4 text-lg text-left w-full">{donations}€</span>
                <span className="text-xs leading-3.5 text-white/60 text-left w-full">
                    {t('statistics.donations')}
                </span>
            </div>
        </div>
    );
};

export default Statistics;
