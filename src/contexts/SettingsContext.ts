import { createContext } from 'react';
import SettingsType from '../types/Settings';

const SettingsContext = createContext<{
    settings: SettingsType;
    setSettings: (settings: SettingsType) => void;
}>({
    settings: {
        showSkills: true,
        enableMusic: true,
        enableSoundEffects: true,
    },
    setSettings: () => {},
});

export default SettingsContext;
