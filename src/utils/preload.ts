export const preloadImage = (name: string, src: string): Promise<[string, HTMLImageElement]> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve([name, img]);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    });

export const preloadAudio = (name: string, src: string): Promise<[string, HTMLAudioElement]> =>
    new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.src = src;
        audio.oncanplaythrough = () => resolve([name, audio]);
        audio.onerror = () => reject(new Error(`Failed to load audio: ${src}`));
    });
