import './Subbuteo.css';
import { Match } from "../../models/match";
import { useState, useEffect } from "react";
import { scoreInit, scoreGoal, Side } from '../../score';
import { clockInit, clockFormat, clockToggle, clockUpdate, clockIsRunning } from '../../clock';

export const Subbuteo = ({ match, toast }: { match: Match, toast: (message: string) => void }) => {
    const [score, setScore] = useState(scoreInit());
    const [clock, setClock] = useState(clockInit());

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

    const goal = (who: Side) => {
        if (!clockIsRunning(clock)) {
            // toast('The clock is not running');
            toast('The score can only be updated when the clock is running!');
            return;
        }
        setScore(scoreGoal(score, who));
    }

    useEffect(() => {
        if (!clockIsRunning(clock)) {
          return;
        }
        const timer = setTimeout(() => {
          setClock(clockUpdate(clock));
        }, 1000);
        return () => clearTimeout(timer);
      }, [clock]);

    return (
        <>
            <div className='Subbuteo'>
                <div className="row clickable">
                    <div
                        className="cell title"
                        title='Click/tap to go fullscreen'
                        onClick={() => goFullscreen(match.fullScreen) }
                    >{match.title}</div>
                    <div
                        className="cell clock"
                        title='Click/tap to toggle the clock on/off'
                        onClick={() => setClock(clockToggle(clock)) }
                    >{clockFormat(clock)}</div>
                </div>
                <div className="row clickable"
                     title='Click/tap to increment the home score; double click/tap to reset the score'
                     onClick={() => goal('home')}
                     onDoubleClick={resetScore}
                >
                    <div className="cell team">{match.homeTeam.name}</div>
                    <div className="cell score">
                        <span className={score.last === 'home' ? 'last' : ''}>{score.home}</span>
                    </div>
                </div>
                <div className="row clickable"
                     title='Click/tap to increment the away score; double click/tap to reset the score'
                     onClick={() => goal('away')}
                     onDoubleClick={resetScore}
                >
                    <div className="cell team">{match.awayTeam.name}</div>
                    <div className="cell score">
                        <span className={score.last === 'away' ? 'last' : ''}>{score.away}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
