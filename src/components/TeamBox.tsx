import { Team } from "../team";

export const TeamBox = ({ id, team, onClick }: { id: string, team: Team, onClick: () => void }) => {
    return (
        <div id={id + '-team'} className="team-box" onClick={onClick}>
            <img src={team.logoUrl} alt={team.name} />
            <div>{team.name}</div>
        </div>
    );
}
