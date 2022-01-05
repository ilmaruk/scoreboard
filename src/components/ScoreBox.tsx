import { formatScore, Score } from "../score";

export const ScoreBox = ({ score, onClick }: { score: Score, onClick: () => void }) => {
    return (
        <>
        <div id="score" onClick={onClick} title="Click to reset the score">{formatScore(score)}</div>
        </>
    );
}
