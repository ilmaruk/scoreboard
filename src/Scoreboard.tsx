import {Subbuteo} from "./layouts/subbuteo/Subbuteo";
import {Match} from "./models/match";

export const Scoreboard = ({ match }: { match: Match }) => {
    return (
        <>
            <Subbuteo match={match} />
        </>
    );
}
