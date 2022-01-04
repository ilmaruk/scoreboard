import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { TeamLogo } from './components/TeamLogo'
import { Score } from './components/Score'

function App() {
  const [homeGoals, setHomeGoals] = useState(0);
  const [awayGoals, setAwayGoals] = useState(0);

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

  return (
    <header style={{ display: 'flex' }}>
      <TeamLogo label="Home" onClick={homeGoal} />
      <Score home={homeGoals} away={awayGoals} onClick={resetGoals} />
      <TeamLogo label="Away" onClick={awayGoal} />
    </header>
  );
}

export default App;
