import React from 'react';
import './Scoreboard.css';
import manchester from './manchester-united.svg'
import shakhtar from './shakhtar.svg'
import background from './background.jpg';
import goool from './goool.gif';

const GooolTimeout = 5000;

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
      awayScorers: [],
      isGoal: false
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
              {this.state.homeScorers.map(goal => (
                <li>{goal}</li>
              ))}
            </ul>
          </div>
          <div className="ScorersBox AwayScorers">
            <ul>
            {this.state.awayScorers.map(goal => (
                <li>{goal}</li>
              ))}
            </ul>
          </div>
        </footer>
        {this.state.isGoal && (<div className="Goool">
          <img src={goool} alt="goool" width="480" height="320"></img>
        </div>)}
      </div>
    );
  }

  homeGoal() {
    let {homeGoals, homeScorers, score, isGoal} = this.state;
    homeGoals++;
    score = `${homeGoals}-${this.state.awayGoals}`;
    homeScorers.push(`${this.state.timer} (${score})`);
    isGoal = true;
    this.setState({homeGoals, homeScorers, score, isGoal}, () => setTimeout(() => {
      let {isGoal} = this.state;
      isGoal = false;
      this.setState({isGoal});
    }, GooolTimeout));
  }
  
  awayGoal() {
    let {awayGoals, awayScorers, score, isGoal} = this.state;
    awayGoals++;
    score = `${this.state.homeGoals}-${awayGoals}`;
    awayScorers.push(`${this.state.timer} (${score})`);
    isGoal = true;
    this.setState({awayGoals, awayScorers, score, isGoal}, () => setTimeout(() => {
      let {isGoal} = this.state;
      isGoal = false;
      this.setState({isGoal});
    }, GooolTimeout));
  }

  renderScore() {
    console.log('@@@', this.state);
    let {score} = this.state;
    score = `${this.state.homeGoals}-${this.state.awayGoals}`;
    this.setState({score});
  }
}

export default Scoreboard;
