import SettingsType from '../types/Settings';

const playSound = (sound: HTMLAudioElement | undefined, settings: SettingsType, loop?: boolean, music?: boolean): void => {
    if (!sound) {
        return;
    }
    if (!settings) {
        return;
    }

    if (music && !settings.enableMusic) {
        return;
    }
    if (!music && !settings.enableSoundEffects) {
        return;
    }

    const soundInstance = sound.cloneNode() as HTMLAudioElement;
    soundInstance.play();
    soundInstance.loop = loop || false;

    if (!loop) {
        soundInstance.onended = () => {
            soundInstance.remove();
        };
    }
};

export default playSound;
