import { useState, useEffect } from "react";
import { BASE_ITEM_NAME } from "../utils/auth";
import SettingsType from "../types/Settings";
import SettingsContext from "../contexts/SettingsContext";

const DEFAULT_SETTINGS: SettingsType = {
    showSkills: false,
    enableMusic: true,
    enableSoundEffects: true,
};

const SettingsProvider = ({ children }: any) => {
    const [settings, setSettings] = useState<SettingsType | null>(null);

    useEffect(() => {
        const savedSettings = localStorage.getItem(`${BASE_ITEM_NAME}settings`);

        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings({
                    showSkills: parsed.showSkills ?? DEFAULT_SETTINGS.showSkills,
                    enableMusic: parsed.enableMusic ?? DEFAULT_SETTINGS.enableMusic,
                    enableSoundEffects: parsed.enableSoundEffects ?? DEFAULT_SETTINGS.enableSoundEffects,
                });
            } catch (error) {
                console.error("Error parsing saved settings:", error);
                setSettings(DEFAULT_SETTINGS);
            }
        } else {
            setSettings(DEFAULT_SETTINGS);
        }
    }, []);

    useEffect(() => {
        if (settings !== null) {
            localStorage.setItem(`${BASE_ITEM_NAME}settings`, JSON.stringify(settings));
        }
    }, [settings]);

    if (settings === null) return null;

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;
