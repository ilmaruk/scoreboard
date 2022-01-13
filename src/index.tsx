import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import reportWebVitals from './reportWebVitals';
import { Scoreboard } from "./Scoreboard";
import { Match } from "./models/match";

const match: Match = {
    layout: 'subbuteo',
    // layout: 'stadium',
    fullScreen: true,
    title: 'World Cup Final',
    homeTeam: {
        name: 'Marulla'
    },
    awayTeam: {
        name: 'Chico'
    }
}

ReactDOM.render(
  <React.StrictMode>
      <Scoreboard match={match} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
