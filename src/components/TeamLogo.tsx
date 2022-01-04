export const TeamLogo = ({ label, onClick }: { label: string, onClick: () => void }) => {
    return (
        <div className="team-logo">
            <button onClick={onClick}>{label}</button>
            <div>{label}</div>
        </div>
    );
}
