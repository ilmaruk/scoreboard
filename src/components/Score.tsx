export const Score = ({ home, away, onClick }: { home: number, away: number, onClick: () => void }) => {
    return (
        <>
        <div id="score" onClick={onClick}>{home} - {away}</div>
        </>
    );
}
