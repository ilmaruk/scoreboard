export interface Score {
    home: number;
    away: number;
    last?: string;
}

type Side = 'home' | 'away';

export const scoreInit = (): Score => {
    return { home: 0, away: 0 };
}

export const scoreGoal = (score: Score, who: Side, updateCond: boolean): Score => {
    return updateCond ? { ...score, [who]: score[who] + 1, last: who } : { ...score };
}

export const formatScore = (score: Score): string => {
    const glue = process.env.FORMAT_GLUE ?? ' - ';
    return `${score.home}${glue}${score.away}`;
}