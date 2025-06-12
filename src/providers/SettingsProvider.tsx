import { useState, useEffect } from "react";
import { BASE_ITEM_NAME } from "../utils/auth";
import SettingsType from "../types/Settings";
import SettingsContext from "../contexts/SettingsContext";

const SettingsProvider = ({ children }: any) => {
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

export default SettingsProvider;