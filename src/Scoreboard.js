import React from 'react';
import './Scoreboard.css';
import manchester from './manchester-united.svg'
import shakhtar from './shakhtar.svg'
import background from './background.jpg';

class Scoreboard extends React.Component {
  constructor() {
    super();
    this.state = {
      minutes: 0,
      seconds: 0,
      timer: '00:00',
      homeGoals: 0,
      awayGoals: 0,
      score: '0-0',
      homeScorers: [],
      awayScorers: []
    }

    setTimeout(() => this.incrementTime(), 1000);
  }

  incrementTime() {
    let {minutes, seconds, timer} = this.state;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    this.setState({minutes, seconds, timer});

    setTimeout(() => this.incrementTime(), 1000);
  }

  render() {
    return (
      <div className="Scoreboard" style={{ backgroundImage: `url(${background})`}}>
        <header className="Header">
          <div className="CrestBox HomeCrest" onClick={() => this.homeGoal()}>
            <img src={shakhtar} alt="Shakhter FC" className="Crest"></img>
          </div>
          <div className="InfoBox">
            <div id="time" className="TimeBox">{this.state.timer}</div>
            <div id="score" className="ScoreBox">{this.state.score}</div>
          </div>
          <div className="CrestBox AwayCrest" onClick={() => this.awayGoal()}>
            <img src={manchester} alt="Manchester United FC" className="Crest"></img>
          </div>
        </header>
        <footer>
          <div className="ScorersBox HomeScorers">
            <ul>
              <li>06:23 (1-2)</li>
            </ul>
          </div>
          <div className="ScorersBox AwayScorers">
            <ul>
              <li>01:23 (0-1)</li>
              <li>04:15 (0-2)</li>
              <li>09:45 (1-3)</li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }

  homeGoal() {
    let {homeGoals, homeScorers, score} = this.state;
    homeGoals++;
    score = `${homeGoals}-${this.state.awayGoals}`;
    homeScorers.push(`${score} (${this.state.timer})`);
    this.setState({homeGoals, homeScorers, score});
  }
  
  awayGoal() {
    let {awayGoals, awayScorers, score} = this.state;
    awayGoals++;
    score = `${this.state.homeGoals}-${awayGoals}`;
    awayScorers.push(`${score} (${this.state.timer})`);
    this.setState({awayGoals, awayScorers, score});
    // awayScorers.push(`${renderTime()} (${renderScore()})`);
  }

  renderScore() {
    console.log('@@@', this.state);
    let {score} = this.state;
    score = `${this.state.homeGoals}-${this.state.awayGoals}`;
    this.setState({score});
  }
}

export default Scoreboard;
