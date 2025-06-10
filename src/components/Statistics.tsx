import { useEffect, useState } from "react";
import { User } from "../objects/User";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

const Statistics = () => {
    const user = User.getInstance();
    const { t } = useTranslation();

    const [viewers, setViewers] = useState(user.viewers);
    const [donations, setDonations] = useState(user.donations);
    const [datetime, setDatetime] = useState(DateTime.fromISO(user.datetime));
    const [now, setNow] = useState(DateTime.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedUser = User.getInstance();
            setViewers(updatedUser.viewers);
            console.log('upaded donations', updatedUser.donations, ' from : ', donations);
            setDonations(updatedUser.donations);
            setDatetime(DateTime.fromISO(updatedUser.datetime));
            setNow(DateTime.now());
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-row shadow-lg rounded-sm justify-evenly gap-3 flex-wrap sm:flex-nowrap items-center transitions statistics sm:h-20 px-1 py-3 w-full max-w-[85%] xs:max-w-[350px] sm:max-w-[450px] sm:top-5 sm:left-[55%] sm:-translate-x-1/2 sm:absolute bg-primary-500">
            <div className="group transitions hover:brightness-125 active:scale-95 flex flex-col justify-center items-center px-2.5 sm:px-4 w-24 sm:w-[120px] h-12 rounded-sm bg-primary-300">
                <span className="leading-4 text-lg text-left w-full">{now.diff(datetime).toFormat('hh:mm:ss')}</span>
                <span className="text-xs leading-3.5 text-white/60 text-left w-full">
                    {t('statistics.time')}
                </span>
            </div>
            <div className="flex flex-col justify-center items-center w-24 px-2.5 sm:px-4 truncate sm:w-[120px] h-12 rounded-sm bg-primary-300">
                <span className="leading-4 text-lg text-left w-full">{viewers}</span>
                <span className="text-xs leading-3.5 text-white/60 text-left w-full">
                    {t('statistics.viewers')}
                </span>
            </div>
            <div className="flex flex-col justify-center items-center w-24 px-2.5 sm:px-4 truncate sm:w-[120px] h-12 rounded-sm bg-primary-300">
                <span className="leading-4 text-lg text-left w-full">{donations}€</span>
                <span className="text-xs leading-3.5 text-white/60 text-left w-full">
                    {t('statistics.donations')}
                </span>
            </div>
        </div>
    );
};

export default Statistics;
