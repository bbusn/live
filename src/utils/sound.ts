export const playSound = (sound: HTMLAudioElement | undefined): void => {
    if (!sound) return;
    const soundInstance = sound.cloneNode() as HTMLAudioElement;
    soundInstance.play();
    soundInstance.onended = () => {
        soundInstance.remove();
    };
};
