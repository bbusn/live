import { useState, useEffect, ReactNode } from "react";
import User from '../objects/User';
import { AUTH_LOADING_TIMEOUT, AUTH_STATUS, AuthStatusType, AUTH_TOKEN_ITEM_NAME } from "../utils/auth";
import Loading from "../components/Loading";
import { preloadAudio, preloadImage } from "../utils/preload";
import useToasts from "../hooks/useToasts";
import STATUS from "../constants/status";
import { useTranslation } from "react-i18next";
import { decrypt } from "../utils/encrypt";
import { ASSET_TYPES } from "../constants/assets";
import AssetsType from "../types/Assets";
import AuthContext from "../contexts/AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [status, setStatus] = useState<AuthStatusType>(AUTH_STATUS.LOADING);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [assets, setAssets] = useState<AssetsType | null>(null);
    const [progress, setProgress] = useState(0);
    const { toast } = useToasts();
    const { t } = useTranslation();

    const connect = async () => {
        const token = localStorage.getItem(AUTH_TOKEN_ITEM_NAME) || null;
        if (!token || token.length < 1) {
            setStatus(AUTH_STATUS.UNAUTH);
            return;
        }

        try {
            let user = (await decrypt(token)) as any;
            if (user === undefined || !user.username || !user.started_at) {
                setStatus(AUTH_STATUS.UNAUTH);
                return;
            }

            User.getInstance().initialize(user);
            await new Promise((r) => setTimeout(r, AUTH_LOADING_TIMEOUT));
            setStatus(AUTH_STATUS.AUTH);
        } catch (error) {
            setStatus(AUTH_STATUS.UNAUTH);
        }
    };

    useEffect(() => {
        if (!loading) return;

        const duration = 1500;
        const steps = 60;
        const interval = duration / steps;

        let progressCount = 0;
        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 100 / steps;
                return next >= 100 ? 100 : next;
            });
            progressCount++;
            if (progressCount >= steps) clearInterval(timer);
        }, interval);


        return () => {
            clearInterval(timer);
        };
    }, [loading]);



    useEffect(() => {
        const loadAll = async () => {
            const startTime = Date.now();

            await connect();

            const imageSources: {
                [key: string]: string;
            } = {
                toast: "/images/toast.png",
                base: "/images/posters/base.png",
                [`1_${ASSET_TYPES.POSTER}`]: "/images/posters/1.png",
                [`1_${ASSET_TYPES.LOGO}`]: "/images/logos/1.png",
                [`1_${ASSET_TYPES.SCREENSHOT}_1`]: "/images/screenshots/1/1.png",
                [`1_${ASSET_TYPES.SCREENSHOT}_2`]: "/images/screenshots/1/2.png",
                [`1_${ASSET_TYPES.SCREENSHOT}_3`]: "/images/screenshots/1/3.png",
                [`2_${ASSET_TYPES.POSTER}`]: "/images/posters/2.png",
                [`2_${ASSET_TYPES.LOGO}`]: "/images/logos/2.png",
                [`2_${ASSET_TYPES.SCREENSHOT}_1`]: "/images/screenshots/2/1.png",
                [`2_${ASSET_TYPES.SCREENSHOT}_2`]: "/images/screenshots/2/2.png",
                [`2_${ASSET_TYPES.SCREENSHOT}_3`]: "/images/screenshots/2/3.png",
                [`3_${ASSET_TYPES.POSTER}`]: "/images/posters/3.png",
                [`3_${ASSET_TYPES.LOGO}`]: "/images/logos/3.png",
                [`3_${ASSET_TYPES.SCREENSHOT}_1`]: "/images/screenshots/3/1.png",
                [`3_${ASSET_TYPES.SCREENSHOT}_2`]: "/images/screenshots/3/2.png",
                [`3_${ASSET_TYPES.SCREENSHOT}_3`]: "/images/screenshots/3/3.png",
                [`4_${ASSET_TYPES.POSTER}`]: "/images/posters/4.png",
                [`4_${ASSET_TYPES.LOGO}`]: "/images/logos/4.png",
                [`4_${ASSET_TYPES.SCREENSHOT}_1`]: "/images/screenshots/4/1.png",
                [`4_${ASSET_TYPES.SCREENSHOT}_2`]: "/images/screenshots/4/2.png",
                [`4_${ASSET_TYPES.SCREENSHOT}_3`]: "/images/screenshots/4/3.png",
                [`5_${ASSET_TYPES.POSTER}`]: "/images/posters/5.png",
                [`5_${ASSET_TYPES.LOGO}`]: "/images/logos/5.png",
                [`5_${ASSET_TYPES.SCREENSHOT}_1`]: "/images/screenshots/5/1.png",
                [`5_${ASSET_TYPES.SCREENSHOT}_2`]: "/images/screenshots/5/2.png",
                [`5_${ASSET_TYPES.SCREENSHOT}_3`]: "/images/screenshots/5/3.png",
                [`6_${ASSET_TYPES.POSTER}`]: "/images/posters/6.png",
                [`6_${ASSET_TYPES.LOGO}`]: "/images/logos/6.png",
                [`6_${ASSET_TYPES.SCREENSHOT}_1`]: "/images/screenshots/6/1.png",
                [`6_${ASSET_TYPES.SCREENSHOT}_2`]: "/images/screenshots/6/2.png",
                [`6_${ASSET_TYPES.SCREENSHOT}_3`]: "/images/screenshots/6/3.png",
            };
            const soundSources = {
                toast: "/sounds/toast.mp3",
                modal: "/sounds/modal.mp3",
                click: "/sounds/click.mp3",
                achievement: "/sounds/achievement.mp3",
                music: "/sounds/music.mp3",
            };

            const imagePromises = Object.entries(imageSources).map(([name, src]) =>
                preloadImage(name, src)
            );
            const audioPromises = Object.entries(soundSources).map(([name, src]) =>
                preloadAudio(name, src)
            );


            const [imagesEntries, soundsEntries] = await Promise.all([
                Promise.all(imagePromises),
                Promise.all(audioPromises),
            ]);

            const images = Object.fromEntries(imagesEntries);
            const sounds = Object.fromEntries(soundsEntries);

            setAssets({ images, sounds });

            const elapsed = Date.now() - startTime;
            const minDuration = 2000;
            if (elapsed < minDuration) {
                await new Promise((resolve) => setTimeout(resolve, minDuration - elapsed));
            }

            setLoading(false);
        };

        (async () => {
            try {
                await loadAll();
            } catch (error) {
                console.error("Error loading assets:", error);
                toast({
                    status: STATUS.MESSAGE,
                    message: t('preload.error.message'),
                });
                setError(true);
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ status, setStatus, connect, assets, error }}>
            {loading ? <Loading error={error} progress={progress} /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;