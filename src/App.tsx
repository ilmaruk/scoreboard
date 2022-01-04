import { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { TeamLogo } from './components/TeamLogo'
import { Score } from './components/Score'

/**
 * Given an accumulated time in milliseconds,
 * returns a formatted string mm:ss.
 * @param millis The accumulated time in milliseconds
 */
const formatTime = (millis: number): string => {
  const accu = Math.round(millis / 1000);
  const seconds = accu % 60;
  const minutes = Math.floor(accu / 60);
  return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}

function App() {
  // Score
  const [homeGoals, setHomeGoals] = useState(0);
  const [awayGoals, setAwayGoals] = useState(0);
  // Clock
  const [clockAccumulated, setClockAccumulated] = useState(0);
  const [clockStartedAt, setClockStartedAt] = useState(0);
  const [time, setTime] = useState(formatTime(0));
  // Timer to update the clock every second
  let timer: NodeJS.Timeout;

  const homeGoal = (): void => {
    setHomeGoals(homeGoals + 1);
  }

  const awayGoal = (): void => {
    setAwayGoals(awayGoals + 1);
  }

  const resetGoals = (): void => {
    if (window.confirm('Do you want to reset the score?')) {
      setHomeGoals(0);
      setAwayGoals(0);  
    }
  }

  const now = (): number => {
    return new Date().getTime();
  }

  const toggleClock = (): void => {
    if (clockStartedAt === 0) {
      // The clock is turned off, so turn on
      setClockStartedAt(now());
    } else {
      // The clock is turned on, so turn off
      setClockStartedAt(0);
      const currentTime = now();
      if (window.confirm('Reset the clock?')) {
        setClockAccumulated(0);
        setTime(formatTime(0));
      } else {
        setClockAccumulated(clockAccumulated + currentTime - clockStartedAt);
      }
    }
  }

  const updateClock = (): void => {
    const accu = clockAccumulated + now() - clockStartedAt;
    setTime(formatTime(accu));
    timer = setTimeout(() => {
      updateClock();
    }, 1000);
  }

  useEffect(() => {
    if (clockStartedAt === 0) {
      if (timer) {
        clearTimeout(timer);
      }
      return;
    }
    timer = setTimeout(() => {
      updateClock();
    }, 1000);
    return () => clearTimeout(timer);
  }, [clockStartedAt]);

  return (
    <>
      <header style={{ display: 'flex' }}>
        <TeamLogo label="Home" onClick={homeGoal} />
        <Score home={homeGoals} away={awayGoals} onClick={resetGoals} />
        <TeamLogo label="Away" onClick={awayGoal} />
      </header>
      <div id="clock" onClick={toggleClock}>{time}</div>
    </>
  );
}

export default App;
