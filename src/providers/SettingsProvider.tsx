import { createContext, useState, useEffect } from "react";
import { BASE_ITEM_NAME } from "../utils/auth";

type SettingsType = {
    showSkills: boolean;
}

export const SettingsContext = createContext<{
    settings: SettingsType;
    setSettings: (settings: SettingsType) => void;
}>({
    settings: { showSkills: false },
    setSettings: () => { },
});

export const SettingsProvider = ({ children }: any) => {
    const [settings, setSettings] = useState<SettingsType>({ showSkills: false });

    useEffect(() => {
        const savedSettings = localStorage.getItem(`${BASE_ITEM_NAME}settings`);

        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings(parsed);
            } catch (error) {
                console.error('Error parsing saved settings:', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(`${BASE_ITEM_NAME}settings`, JSON.stringify(settings));
    }, [settings]);

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};