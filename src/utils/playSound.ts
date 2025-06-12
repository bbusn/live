const playSound = (sound: HTMLAudioElement | undefined, loop?: boolean): void => {
    if (!sound) return;
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