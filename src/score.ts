export interface Score {
    home: number;
    away: number;
}

export const formatScore = (score: Score): string => {
    const glue = process.env.FORMAT_GLUE ?? ' - ';
    return `${score.home}${glue}${score.away}`;
}