import { useTranslation } from "react-i18next";
import Banner from "../components/Banner";
import useToasts from "../hooks/useToasts";
import { useEffect, useRef, useState } from "react";
import User from "../objects/User";
import useAuth from "../hooks/useAuth";
import { AUTH_STATUS } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import ROUTES from "../constants/routes";
import STATUS from "../constants/status";
import playSound from "../utils/playSound";
import useSettings from "../hooks/useSettings";
import { DEFAULT_TASKS } from "../constants/tasks";

const WelcomePage = () => {
    const { t } = useTranslation();
    const { toast } = useToasts();
    const [introduced, setIntroduced] = useState<boolean>(false);
    const [defaultUsername, setDefaultUsername] = useState<string>('');
    const ref = useRef<HTMLInputElement | null>(null);
    const { status, setStatus, assets } = useAuth();
    const { settings } = useSettings();
    const navigate = useNavigate();

    const start = async () => {
        playSound(assets?.sounds.click, settings);
        if (!ref.current) return;

        let username = ref.current.value.trim();
        const regex = /^[a-zA-Z0-9_ .°éèÉÈ-]+$/;

        if (username.length === 0) {
            username = defaultUsername;
        }

        const isValidUsername = regex.test(username);

        if (!isValidUsername) {
            toast({
                status: STATUS.MESSAGE,
                message: t('welcome.error.invalid'),
            });
            return;
        }

        if (username.length < 3 || username.length > 20) {
            toast({
                status: STATUS.MESSAGE,
                message: t('welcome.error.length'),
            });
            return;
        }

        const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        if (!isIos) {
            try {
                document.body.requestFullscreen();
            } catch (error) {
                console.warn('Unable to allow fullscreen, user maybe on ios...');
            }
        }

        User.getInstance().initialize({ username, started_at: new Date(), achievements: [], viewers: 0, donations: 0, last_connected_at: new Date(), tasks: DEFAULT_TASKS });


        setStatus(AUTH_STATUS.AUTH);

        const timeout = setTimeout(() => {
            toast({
                status: STATUS.MESSAGE,
                message: `${t('welcome.success.1')} **%${username}**${t('welcome.success.2')}`,
            });
            clearTimeout(timeout);
        }, 2000);

        navigate(ROUTES.DASHBOARD);

        return;
    }

    useEffect(() => {
        if (status === AUTH_STATUS.AUTH) {
            navigate(ROUTES.DASHBOARD);
        }
    }, [status]);

    useEffect(() => {
        const interval = setInterval(() => {
            const index = Math.floor(Math.random() * 26) + 1;
            const randomUsername = t(`welcome.username.placeholder.${index}`);
            setDefaultUsername(randomUsername);
        }, 4000);

        const timeout = setTimeout(() => {
            setIntroduced(true);
        }, 6000);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [t]);

    return (
        <div className={`transition-all duration-300 ${!introduced && 'sm:-mt-12'} flex flex-col items-center justify-center h-full w-full gap-4 sm:gap-6`}>
            <Banner />
            {!introduced ? (
                <h2 className="font-light font-primary text-xl flex flex-col items-center justify-center">
                    <span className="animation-fade-in animation-delay-0-5 text-gray-300">{t("welcome.intro.1")}</span>
                    <span className="animation-fade-in animation-delay-1-75 text-gray-300">{t("welcome.intro.2")}</span>
                    <span className="animation-fade-in animation-delay-3">{t("welcome.intro.3")}</span>
                </h2>
            ) : (
                <div className="transition-all duration-200 animation-fade-in custom-width flex flex-col justify-center items-center gap-4">
                    <p className="font-light font-primary text-base sm:text-xl w-full text-left">
                        {t('welcome.username.label')}
                    </p>
                    <input
                        onClick={() => playSound(assets?.sounds.click, settings)}
                        ref={ref}
                        type="text"
                        className="w-full max-w-[300px] sm:max-w-[375px] px-3 py-4 bg-primary-300 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary-500 transition-all duration-300"
                        placeholder={defaultUsername}
                        min={3}
                        max={20}
                        onKeyDown={async (e) => {
                            if (e.key === 'Enter') {
                                await start();
                            }
                        }}
                    />
                    <button className="mt-6 button-primary w-full transitions" onClick={async () => await start()}>{t('welcome.start')}</button>
                </div>
            )}

        </div>
    )
};

export default WelcomePage;
