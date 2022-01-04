import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { TeamLogo } from './components/TeamLogo'
import { Score } from './components/Score'

function App() {
  const [home, setHome] = useState(0);
  const [away, setAway] = useState(0);
  return (
    <header style={{ display: 'flex' }}>
      <TeamLogo label="Home" onClick={() => setHome(home + 1)} />
      <Score home={home} away={away} />
      <TeamLogo label="Away" onClick={() => setAway(away + 1)} />
    </header>
  );
}

export default App;
