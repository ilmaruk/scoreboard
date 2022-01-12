import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import reportWebVitals from './reportWebVitals';
import { Scoreboard } from "./Scoreboard";
import { Match } from "./models/match";
import { Stadium } from './layouts/stadium/Stadium';

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

const layout = (match: Match) => {
    switch (match.layout) {
        case 'stadium':
            return (<Stadium match={match} />);
        case 'subbuteo':
        default:
            return (<Scoreboard match={match} />);
    }
}

ReactDOM.render(
  <React.StrictMode>
      {layout(match)}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
