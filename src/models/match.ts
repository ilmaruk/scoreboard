export interface Team {
    name: string;
    short?: string;
    url?: string;
}

export interface Match {
    layout: string;
    fullScreen?: boolean;
    title?: string;
    homeTeam: Team;
    awayTeam: Team;
}
