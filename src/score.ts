export interface Score {
    home: number;
    away: number;
    last?: string;
}

type Side = 'home' | 'away';

export const scoreInit = (): Score => {
    return { home: 0, away: 0 };
}

export const scoreGoal = (score: Score, who: Side): Score => {
    return { ...score, [who]: score[who] + 1, last: who };
}

export const formatScore = (score: Score): string => {
    const glue = process.env.FORMAT_GLUE ?? ' - ';
    return `${score.home}${glue}${score.away}`;
}