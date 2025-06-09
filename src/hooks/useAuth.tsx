import { createContext, useContext, useState, useEffect } from "react";
import { User, UserType } from '../objects/User';
import { AUTH_LOADING_TIMEOUT, AUTH_STATUS, AuthStatusType, AUTH_TOKEN_ITEM_NAME } from "../utils/auth";
import Loading from "../components/Loading";
import { preloadAudio, preloadImage } from "../utils/preload";
import { useToasts } from "./useToasts";
import { STATUS } from "../constants/status";
import { useTranslation } from "react-i18next";
import { decrypt } from "../utils/encrypt";

type Assets = {
  images: Record<string, HTMLImageElement>;
  sounds: Record<string, HTMLAudioElement>;
  jsons: Record<string, any>;
};

export type ProjectType = {
  id: string;
  name: string;
  description: string;
  images?: string[];
}

const AuthContext = createContext<{
  status: AuthStatusType;
  setStatus: (status: AuthStatusType) => void;
  connect: () => Promise<void>;
  error: boolean;
  assets: Assets | null;
}>({
  status: AUTH_STATUS.LOADING,
  setStatus: () => { },
  connect: async () => { },
  error: false,
  assets: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [status, setStatus] = useState<AuthStatusType>(AUTH_STATUS.LOADING);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [assets, setAssets] = useState<Assets | null>(null);
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
      const user = await decrypt(token) as UserType;

      if (!user || !user.username || !user.datetime) {
        setStatus(AUTH_STATUS.UNAUTH);
        return;
      }

      User.getInstance().initialize({ username: user.username, datetime: user.datetime });
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

    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    const loadAll = async () => {
      const startTime = Date.now();

      await connect();

      const imageSources = {
        tv: "/images/projects/tv.png",
        kingbzz: "/images/projects/kingbzz.png",
        logis: "/images/projects/logis.png",
        mmi: "/images/projects/mmi.png",
        levelplus: "/images/projects/levelplus.png",
        cli: "/images/projects/cli.png",
      };
      const soundSources = {
        begin: "/sounds/begin.mp3",
        toast: "/sounds/toast.mp3",
      };
      const jsonSources = {
        projects: "/projects.json",
      }

      const imagePromises = Object.entries(imageSources).map(([name, src]) =>
        preloadImage(name, src)
      );
      const audioPromises = Object.entries(soundSources).map(([name, src]) =>
        preloadAudio(name, src)
      );
      const jsonPromises = Object.entries(jsonSources).map(([name, src]) =>
        fetch(src).then((response) => response.json()).then((data) => [name, data])
      );

      const [imagesEntries, soundsEntries, jsonEntries] = await Promise.all([
        Promise.all(imagePromises),
        Promise.all(audioPromises),
        Promise.all(jsonPromises)
      ]);

      const images = Object.fromEntries(imagesEntries);
      const sounds = Object.fromEntries(soundsEntries);
      const jsons = Object.fromEntries(jsonEntries);

      setAssets({ images, sounds, jsons });

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
          status: STATUS.ERROR,
          message: t('preload.error.message'),
        })
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
