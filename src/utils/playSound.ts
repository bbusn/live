import SettingsType from '../types/Settings';

const playSound = (sound: HTMLAudioElement | undefined, settings: SettingsType, loop?: boolean, music?: boolean): void => {
    if (!sound) {
        console.warn('Sound is not defined. Cannot play sound.');
        return;
    }
    if (!settings) {
        console.warn('Settings are not defined. Cannot play sound.');
        return;
    }

    if (music && !settings.enableMusic) {
        console.warn('Music is disabled in settings. Cannot play music sound.');
        return;
    }
    if (!music && !settings.enableSoundEffects) {
        console.log(settings);
        console.warn('Sound effects are disabled in settings. Cannot play sound effect.');
        return;
    }

    console.log('Playing sound:', sound.src, 'Loop:', loop, 'Music:', music);

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
