
export function generatePlayers(teamId:number, name :string) {
    const playerNames = [];
    for (let i = 1; i <= teamId; i++) {
        playerNames.push(name +` `+ i);
    }
    return playerNames;
}