import { useEffect, useState } from 'react';
import './App.css';
import { TeamLogo } from './components/TeamLogo'
import { Score } from './components/Score'
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
  const [homeGoals, setHomeGoals] = useState(0);
  const [awayGoals, setAwayGoals] = useState(0);
  // Clock
  const [clockAccumulated, setClockAccumulated] = useState(0);
  const [clockStartedAt, setClockStartedAt] = useState(0);
  const [time, setTime] = useState(formatTime(0));
  // Goal scorers
  const [homeScorers, setHomeScorers] = useState([] as Scorer[]);
  const [awayScorers, setAwayScorers] = useState([] as Scorer[]);
  // Timer to update the clock every second
  // TODO: see warning and improve
  let timer: NodeJS.Timeout;

  const homeGoal = (): void => {
    // Only set if the clock is running
    if (clockStartedAt === 0) {
      return;
    }
    setHomeGoals(homeGoals + 1);
  }

  const awayGoal = (): void => {
    // Only set if the clock is running
    if (clockStartedAt === 0) {
      return;
    }
    setAwayGoals(awayGoals + 1);
  }

  const resetGoals = async (): Promise<void> => {
    if (await confirm('Reset the score?')) {
      setHomeGoals(0);
      setAwayGoals(0);  
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

  useEffect(() => {
    if (homeGoals === 0) {
      // Nothing to do
      return;
    }
    const scorer: Scorer = {
      time: clockTime(),
      score: formatScore(homeGoals, awayGoals)
    };
    setHomeScorers((scorers) => [...scorers, scorer]);
  }, [homeGoals]);

  useEffect(() => {
    if (awayGoals === 0) {
      // Nothing to do
      return;
    }
    const scorer: Scorer = {
      time: clockTime(),
      score: formatScore(homeGoals, awayGoals)
    };
    setAwayScorers((scorers) => [...scorers, scorer]);
  }, [awayGoals]);

  useEffect(() => {
    console.log('Home scorers', homeScorers);
    console.log('Away scorers', awayScorers);
  }, [homeScorers, awayScorers])

  return (
    <>
      <header>
        <div id="home">
          <TeamLogo label="Home" onClick={homeGoal} />
        </div>
        <div id="data">
          <Score home={homeGoals} away={awayGoals} onClick={resetGoals} />
          <div id="clock" onClick={toggleClock} title="Click to toggle the clock">{time}</div>
        </div>
        <div id="away">
          <TeamLogo label="Away" onClick={awayGoal} />
        </div>
      </header>
    </>
  );
}

export default App;
