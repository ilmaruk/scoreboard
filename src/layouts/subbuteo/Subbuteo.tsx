import './subbuteo.css';
import {Match} from "../../models/match";
import {useState} from "react";

export const Subbuteo = ({ match }: { match: Match }) => {
    const [ score, setScore ] = useState({ home: 0, away: 0 } as { [key: string]: number });
    const [ last, setLast ] = useState('');

    const goFullscreen = async (fullScreen: boolean | undefined) => {
        if (!fullScreen) {
            return;
        }
        await document.documentElement.requestFullscreen();
    }

    const goal = (who: string): void => {
        setScore({ ...score, [who]: score[who] + 1 });
        setLast(who);
    }

    const resetScore = () => {
        setScore({ home: 0, away: 0 });
    }

    return (
        <>
            <div className="row">
                <div className="cell team" onClick={() => goFullscreen(match.fullScreen) }>{match.homeTeam.name}</div>
                <div className="cell score" onClick={() => goal('home')} onDoubleClick={resetScore}><span className={last === 'home' ? 'last' : ''}>{score.home}</span></div>
            </div>
            <div className="row">
                <div className="cell team" onClick={() => goFullscreen(match.fullScreen) }>{match.awayTeam.name}</div>
                <div className="cell score" onClick={() => goal('away')}><span className={last === 'away' ? 'last' : ''}>{score.away}</span></div>
            </div>
        </>
    );
}
