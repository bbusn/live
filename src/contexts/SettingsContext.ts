import { createContext } from 'react';
import SettingsType from '../types/Settings';

const SettingsContext = createContext<{
    settings: SettingsType;
    setSettings: (settings: SettingsType) => void;
}>({
    settings: { showSkills: false },
    setSettings: () => {},
});

export default SettingsContext;
