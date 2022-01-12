export interface Clock {
    startedAt: number;
    offset: number;
    accumulated: number;
}

export type NowFn = () => number;

export const clockNow = (): number => {
    return new Date().getTime();
}

export const clockInit = (): Clock => {
    return { startedAt: 0, offset: 0, accumulated: 0 };
}

export const clockToggle = (clock: Clock): Clock => {
    if (!clockIsRunning(clock)) {
        // The clock is turned off, so turn it on
        return { ...clock, startedAt: clockNow() };
      } else {
        // The clock is turned on, so turn it off
        if (window.confirm('Reset the clock?')) {
          return clockInit();
        } else {
          return { ...clock, startedAt: 0, offset: clock.accumulated };
        }
      }
  
}

export const clockIsRunning = (clock: Clock): boolean => {
    return clock.startedAt > 0;
}

export const clockUpdate = (clock: Clock): Clock => {
    return { ...clock, accumulated: clock.offset + clockNow() - clock.startedAt };
}

export const clockFormat = (clock: Clock): string => {
    return formatTime(clock);
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
    