export interface Clock {
    startedAt: number;
    offset: number;
    accumulated: number;
}

/**
 * Given an accumulated time in milliseconds,
 * returns a formatted string mm:ss.
 * @param millis The accumulated time in milliseconds
 */
export const formatTime = (clock: Clock): string => {
    const accu = Math.round(clock.accumulated / 1000);
    const seconds = accu % 60;
    const minutes = Math.floor(accu / 60);
    return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}
    