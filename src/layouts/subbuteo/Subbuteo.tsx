import './subbuteo.css';
import { Match } from "../../models/match";
import { useState, useEffect } from "react";
import { scoreInit, scoreGoal } from '../../score';
import { clockInit, clockFormat, clockToggle, clockUpdate, clockIsRunning } from '../../clock';

export const Subbuteo = ({ match }: { match: Match }) => {
    const [score, setScore] = useState(scoreInit());
    const [clock, setClock] = useState(clockInit());

    let timer: NodeJS.Timeout;

    const goFullscreen = async (fullScreen: boolean | undefined): Promise<void> => {
        if (!fullScreen) {
            return;
        }
        await document.documentElement.requestFullscreen();
    }

    const resetScore = (): void => {
        if (window.confirm('Reset the score?')) {
            setScore(scoreInit());
        }
    }

    useEffect(() => {
        if (!clockIsRunning(clock)) {
          return;
        }
        timer = setTimeout(() => {
          setClock(clockUpdate(clock));
        }, 1000);
        return () => clearTimeout(timer);
      }, [clock]);
    
    return (
        <>
            <div className="row">
                <div className="cell title" onClick={() => goFullscreen(match.fullScreen) }>{match.title}</div>
                <div className="cell clock" onClick={() => setClock(clockToggle(clock)) }>{clockFormat(clock)}</div>
            </div>
            <div className="row">
                <div className="cell team">{match.homeTeam.name}</div>
                <div className="cell score" onClick={() => setScore(scoreGoal(score, 'home'))} onDoubleClick={resetScore}><span className={score.last === 'home' ? 'last' : ''}>{score.home}</span></div>
            </div>
            <div className="row">
                <div className="cell team">{match.awayTeam.name}</div>
                <div className="cell score" onClick={() => setScore(scoreGoal(score, 'away'))} onDoubleClick={resetScore}><span className={score.last === 'away' ? 'last' : ''}>{score.away}</span></div>
            </div>
        </>
    );
}
