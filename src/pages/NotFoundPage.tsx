import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import ICONS from "../constants/icons";
import { useEffect, useState } from "react";
import useToasts from "../hooks/useToasts";
import User from "../objects/User";
import STATUS from "../constants/status";
import { ACHIEVEMENTS } from "../constants/achievements";
import playSound from "../utils/playSound";
import useSettings from "../hooks/useSettings";
import useAuth from "../hooks/useAuth";

const NotFoundPage = () => {
    const { toast } = useToasts();
    const user = User.getInstance();
    const [triedToReturn, setTriedToReturn] = useState(false);
    const { t } = useTranslation();
    const { settings } = useSettings();
    const { assets } = useAuth();

    const handleReturn = () => {
        if (triedToReturn) return;
        playSound(assets?.sounds.click, settings);
        setTriedToReturn(true);
        toast({
            status: STATUS.MESSAGE,
            message: t('not_found.returning'),
        });
    };

    useEffect(() => {
        toast({
            status: STATUS.MESSAGE,
            message: t('not_found.error'),
        });

        if (user.hasAchievement(ACHIEVEMENTS.NOT_FOUND)) return;

        setTimeout(() => {
            const donationsAmount = Math.floor(Math.random() * 100) + 1;
            user.addAchievement(ACHIEVEMENTS.NOT_FOUND);
            toast({
                status: STATUS.ACHIEVEMENT,
                message: ACHIEVEMENTS.NOT_FOUND,
                donationsAmount: donationsAmount,
            });
            user.addDonation(donationsAmount);
        }, 1500);
    }, []);

    return (
        <div className={`sm:mt-16 mt-8 sm:mb-0 mb-20 transition-all duration-300 min-h-[300px] px-4 h-max flex flex-col gap-3 justify-center items-center w-full max-w-[95%] xs:w-md sm:w-md xl:w-xl`}>
            <Icon icon={ICONS.NOT_FOUND} className="text-4xl text-white" />
            <p className="text-2xl font-semibold">{t('not_found.title')}</p>
            <p className="text-lg">{t('not_found.description')}</p>
            {!triedToReturn && (
                <button className="mt-6 button-primary !py-2 w-full max-w-[300px] transitions" onClick={() => handleReturn()}>{t('not_found.return')}</button>
            )}
        </div >
    );
};

export default NotFoundPage;