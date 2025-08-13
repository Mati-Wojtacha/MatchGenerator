const WIN_POINTS = 3;
const DRAW_POINTS = 1;
const LOSS_POINTS = 0;

interface PlayerData {
    name: string;
    winMatches: number;
    lossMatches: number;
    drawMatches: number;
    points: number;
    smallPoints: number;
    totalMatches: number;
}

const createEmptyPlayerData = (player: string): PlayerData => ({
    name: player,
    winMatches: 0,
    lossMatches: 0,
    drawMatches: 0,
    points: 0,
    smallPoints: 0,
    totalMatches: 0
});

const updatePlayerStats = (
    playerData: PlayerData,
    isWin: boolean,
    isDraw: boolean,
    points: number,
    pointsDiff: number
) => {
    playerData.points += points;
    playerData.smallPoints += pointsDiff;

    if (isDraw) playerData.drawMatches++;
    else if (isWin) playerData.winMatches++;
    else playerData.lossMatches++;

    playerData.totalMatches++;
};

export function getPoints(data: any): PlayerData[] {
    const playerPointsMap = new Map<string, PlayerData>();

    if(!data) return [];

    data.forEach((match: any) => {
        const allPlayers = [...match.firstHalf, ...match.secondHalf];

        if ([match.firstPoints, match.secondPoints].some(score => score === undefined || score === null || score === '')) {
            allPlayers.forEach(player =>
                !playerPointsMap.has(player) && playerPointsMap.set(player, createEmptyPlayerData(player))
            );
            return;
        }

        const firstPoints = match.firstPoints;
        const secondPoints = match.secondPoints;
        const pointsDiff = firstPoints - secondPoints;
        const isDraw = firstPoints === secondPoints;
        const firstTeamWins = firstPoints > secondPoints;

        allPlayers.forEach(player => {
            if (!playerPointsMap.has(player)) {
                playerPointsMap.set(player, createEmptyPlayerData(player));
            }

            const playerData = playerPointsMap.get(player)!;
            const isFirstTeam = match.firstHalf.includes(player);
            const isWinningTeam = isFirstTeam ? firstTeamWins : !firstTeamWins;

            updatePlayerStats(
                playerData,
                isWinningTeam,
                isDraw,
                isDraw ? DRAW_POINTS : (isWinningTeam ? WIN_POINTS : LOSS_POINTS),
                isFirstTeam ? pointsDiff : -pointsDiff
            );
        });
    });

    return Array.from(playerPointsMap.values());
}