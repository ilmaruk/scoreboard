import { useEffect, useState } from 'react';
import './App.css';
import { TeamLogo } from './components/TeamLogo'
import { ScoreBox } from './components/ScoreBox'
import { Score } from './score';
import { confirm } from "react-confirm-box";

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

const formatScore = (home: number, away: number): string => {
  return `${home} - ${away}`;
}

interface Scorer {
  time: number;
  score: string;
}

function App() {
  // Score
  const [score, setScore] = useState({ home: 0, away: 0 } as Score);
  // Clock
  const [clockAccumulated, setClockAccumulated] = useState(0);
  const [clockStartedAt, setClockStartedAt] = useState(0);
  const [time, setTime] = useState(formatTime(0));
  // Timer to update the clock every second
  // TODO: see warning and improve
  let timer: NodeJS.Timeout;

  const homeGoal = (): void => {
    // Only set if the clock is running
    if (clockStartedAt === 0) {
      return;
    }
    setScore({ ...score, home: score.home + 1 });
  }

  const awayGoal = (): void => {
    // Only set if the clock is running
    if (clockStartedAt === 0) {
      return;
    }
    setScore({ ...score, away: score.away + 1 });
  }

  const resetGoals = async (): Promise<void> => {
    if (await confirm('Reset the score?')) {
      setScore({ home: 0, away: 0 });
    }
  }

  const now = (): number => {
    return new Date().getTime();
  }

  const clockTime = (): number => {
    return clockAccumulated + now() - clockStartedAt;
  }

  const toggleClock = async (): Promise<void> => {
    if (clockStartedAt === 0) {
      // The clock is turned off, so turn on
      setClockStartedAt(now());
    } else {
      // The clock is turned on, so turn off
      setClockStartedAt(0);
      const currentTime = now();
      if (await confirm('Reset the clock?')) {
        setClockAccumulated(0);
        setTime(formatTime(0));
      } else {
        setClockAccumulated(clockAccumulated + currentTime - clockStartedAt);
      }
    }
  }

  const updateClock = (): void => {
    setTime(formatTime(clockTime()));
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
      <main>
        <div id="home">
          <TeamLogo label="Home" onClick={homeGoal} />
        </div>
        <div id="data">
          <ScoreBox score={score} onClick={resetGoals} />
          <div id="clock" onClick={toggleClock} title="Click to toggle the clock">{time}</div>
        </div>
        <div id="away">
          <TeamLogo label="Away" onClick={awayGoal} />
        </div>
      </main>
    </>
  );
}

export default App;
