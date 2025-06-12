function formatTimeDiff(now: Date, then: Date) {
    const diffMs = now.getTime() - then.getTime(); 
    const totalSeconds = Math.floor(diffMs / 1000);

    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export default formatTimeDiff;