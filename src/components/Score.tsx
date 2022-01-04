export const Score = ({ home, away, onClick }: { home: number, away: number, onClick: () => void }) => {
    return (
        <>
        <div id="score" onClick={onClick} title="Click to reset the score">{home} - {away}</div>
        </>
    );
}
