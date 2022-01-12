export interface Team {
    name: string;
    short?: string;
    url?: string;
}

export interface Match {
    layout: string;
    fullScreen?: boolean;
    homeTeam: Team;
    awayTeam: Team;
}
