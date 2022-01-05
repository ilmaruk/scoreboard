import { useEffect, useState } from 'react';
import './App.css';
import { TeamBox } from './components/TeamBox'
import { ScoreBox } from './components/ScoreBox'
import { Score } from './score';
import { confirm } from "react-confirm-box";
import { Team } from './team';
import { ClockBox } from './components/ClockBox';
import { Clock } from './clock';

const home: Team = {
  name: 'Genoa 1893 CFC',
  logoUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6c/Genoa_C.F.C._logo.svg'
}

const away: Team = {
  name: 'UC Sampdoria',
  logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d2/U.C._Sampdoria_logo.svg'
}

function App() {
  // Score
  const [score, setScore] = useState({ home: 0, away: 0 } as Score);
  // Clock
  const [clock, setClock] = useState({ startedAt: 0, offset: 0, accumulated: 0 } as Clock);
  // const [clockAccumulated, setClockAccumulated] = useState(0);
  // const [clockStartedAt, setClockStartedAt] = useState(0);
  // const [time, setTime] = useState(formatTime(0));
  // Timer to update the clock every second
  // TODO: see warning and improve
  let timer: NodeJS.Timeout;

  const homeGoal = (): void => {
    // Only set if the clock is running
    if (clock.startedAt === 0) {
      return;
    }
    setScore({ ...score, home: score.home + 1 });
  }

  const awayGoal = (): void => {
    // Only set if the clock is running
    if (clock.startedAt === 0) {
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

  const toggleClock = async (): Promise<void> => {
    if (clock.startedAt === 0) {
      // The clock is turned off, so turn on
      setClock({ ...clock, startedAt: now() });
    } else {
      // The clock is turned on, so turn off
      if (timer) {
        clearTimeout(timer);
      }
      if (await confirm('Reset the clock?')) {
        setClock({ startedAt: 0, offset: 0, accumulated: 0 });
      } else {
        setClock({ ...clock, startedAt: 0, offset: clock.accumulated });
      }
    }
  }

  const updateClock = (): void => {
    setClock({ ...clock, accumulated: clock.offset + now() - clock.startedAt });
    timer = setTimeout(() => {
      updateClock();
    }, 1000);
  }

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    if (clock.startedAt === 0) {
      return;
    }
    timer = setTimeout(() => {
      updateClock();
    }, 1000);
    return () => clearTimeout(timer);
  }, [clock]);

  return (
    <>
      <main>
        <TeamBox id="home" team={home} onClick={homeGoal} />
        <div id="data">
          <ClockBox clock={clock} onClick={toggleClock} />
          <ScoreBox score={score} onClick={resetGoals} />
        </div>
        <TeamBox id="away" team={away} onClick={awayGoal} />
      </main>
    </>
  );
}

export default App;
