
export function generatePlayers(teamId:number) {
    const playerNames = [];
    for (let i = 1; i <= teamId; i++) {
        playerNames.push(`Gracz ${i}`);
    }
    return playerNames;
}