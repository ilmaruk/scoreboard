export const TeamLogo = ({ label, onClick }: { label: string, onClick: () => void }) => {
    return (
        <div className="team-logo" onClick={onClick}>
            <button>{label}</button>
            <div>{label}</div>
        </div>
    );
}
