let musicAudio: HTMLAudioElement | null = null;

export const playMusic = (src: string = '', loop = true) => {
    if (src === '' || !src) return;
    if (musicAudio && !musicAudio.paused) return;

    musicAudio = new Audio(src);
    musicAudio.loop = loop;
    musicAudio.play();
};

export const stopMusic = () => {
    if (musicAudio) {
        musicAudio.pause();
        musicAudio.currentTime = 0;
    }
};

export const isMusicPlaying = () => {
    return musicAudio && !musicAudio.paused;
};
