import './Scoreboard.css';
import manchester from './manchester-united.svg'
import shakhtar from './shakhtar.svg'
import background from './background.jpg';

function Scoreboard() {
  return (
    <div className="Scoreboard" style={{ backgroundImage: `url(${background})`}}>
      <header className="Header">
        <div className="CrestBox HomeCrest">
          <img src={shakhtar} alt="Shakhter FC" class="Crest"></img>
        </div>
        <div className="InfoBox">
          <div id="time" className="TimeBox">09:56</div>
          <div id="score" className="ScoreBox">1:2</div>
        </div>
        <div className="CrestBox AwayCrest">
          <img src={manchester} alt="Manchester United FC" class="Crest"></img>
        </div>
      </header>
    </div>
  );
}

export default Scoreboard;
