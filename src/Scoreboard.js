import React from 'react';
import './Scoreboard.css';
import homeCrest from './genoa-cfc.svg'
import awayCrest from './internazionale-fc.svg'
import background from './background.jpg';
import goool from './goool.gif';

const GooolTimeout = 5000;
const HomeIndex = 0;
const AwayIndex = 1;

class Score {
  _goals = [0, 0];
  _scorers = [[], []];

  set(who, when) {
    this._goals[who]++;
    this._scorers[who].push(`${when} (${this.toString()})`);
  }

  scorers(who) {
    return this._scorers[who];
  }

  toString() {
    return `${this._goals[HomeIndex]}-${this._goals[AwayIndex]}`;
  }
}

class Clock {
  _periodLength;
  _isOn = false;
  _onAt = null;
  _offAt = null;
  _offset = 0;
  _mins = 0;
  _secs = 0;
  _extraMins = 0;
  _extraSecs = 0;

  constructor(periodLength) {
    this._periodLength = periodLength;
  }

  isOn() {
    return this._isOn;
  }

  toggle() {
    this._isOn = !this._isOn;
    console.log('clock on:', this._isOn);
    if (!this._isOn) {
      // Toggled OFF
      this._offAt = Date.now();
      return;
    }

    // Toggled ON
    const now = Date.now();
    if (!this._onAt) {
      this._onAt = now;
    }
    if (this._offAt !== null) {
      this._offset += now - this._offAt;
      this._offAt = null;
    }

    return this._isOn;
  }

  update() {
    const elapsed = Math.round((Date.now() - this._onAt - this._offset) / 1000);
    this._secs = elapsed % 60;
    this._mins = Math.floor(elapsed / 60);
    console.log(this);
  }

  toString() {
    return `${String(this._mins).padStart(2, '0')}:${String(this._secs).padStart(2, '0')}`;
  }

  extraTime() {

  }
}

class Scoreboard extends React.Component {
  constructor() {
    super();
    this.state = {
      clock: new Clock(600), // TODO: should be customisable
      score: new Score(),
      isGoal: false
    }
  }

  incrementTime() {
    let { minutes, seconds, timer } = this.state;
    const elapsedTime = Math.round((Date.now() - this.state.timeStartedAt) / 1000);

    if (elapsedTime <= this.state.periodLength) {
      seconds = elapsedTime % 60;
      minutes = Math.floor(elapsedTime / 60);
      timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      this.setState({ minutes, seconds, timer });
    } else {
      const extra = elapsedTime - this.state.periodLength;
      seconds = extra % 60;
      minutes = Math.floor(extra / 60);
      const extraTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      this.setState({ extraTime });
    }

    if (this.state.clockOn) {
      setTimeout(() => this.incrementTime(), 1000);
    }
  }

  toggleClock() {
    let { clock } = this.state;
    clock.toggle();
    this.setState({ clock });
    this.updateClock();
  }

  updateClock() {
    let { clock } = this.state;
    clock.update();
    this.setState({ clock });
    if (clock.isOn()) {
      setTimeout(() => this.updateClock(), 1000);
    }
  }

  render() {
    return (
      <div className="Scoreboard" style={{ backgroundImage: `url(${background})`}}>
        <header className="Header">
          <div className="CrestBox HomeCrest" onClick={() => this.updateScore(HomeIndex)}>
            <img src={homeCrest} alt="Shakhter FC" className="Crest"></img>
          </div>
          <div className="InfoBox">
            <div id="time" className="TimeBox" onClick={() => this.toggleClock()}>{this.state.clock.toString()}{this.state.extraTime && <span className="ExtraTimeBox">(+{this.state.extraTime})</span>}</div>
            <div id="score" className="ScoreBox">{this.state.score.toString()}</div>
          </div>
          <div className="CrestBox AwayCrest" onClick={() => this.updateScore(AwayIndex)}>
            <img src={awayCrest} alt="Manchester United FC" className="Crest"></img>
          </div>
        </header>
        <footer>
          <div className="ScorersBox HomeScorers">
            <ul>
              {this.state.score.scorers(HomeIndex).map(goal => (
                <li>{goal}</li>
              ))}
            </ul>
          </div>
          <div className="ScorersBox AwayScorers">
            <ul>
            {this.state.score.scorers(AwayIndex).map(goal => (
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

  updateScore(who) {
    if (!this.state.clock.isOn()) {
      alert('The clock is off');
      return;
    }
    let { score } = this.state;
    score.set(who, this.state.clock.toString());
    // this.setState({score});
    this.setState({score}, this.goalCarousel);
  }

  goalCarousel() {
    let isGoal = true;
    this.setState({isGoal});
    setTimeout(() => {
      isGoal = false;
      this.setState({isGoal});
    }, GooolTimeout);
  }
}

export default Scoreboard;
