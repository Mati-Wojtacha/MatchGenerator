export function generateUniqueTeamCombinations(nPlayers: number)
{
    if (nPlayers < 4 ) {
        throw new Error('The number of players must be greater than or equal to 4');
    }

    const players = Array.from({ length: nPlayers }, (_, i) => i + 1);
    const matches: [number, number[], number[]][] = [];


    for (let i = 0; i < players.length - 1; i++) {
        for (let j = i + 1; j < players.length; j++) {
            for (let k = 0; k < players.length - 1; k++) {
                for (let l = k + 1; l < players.length; l++) {
                    if (k !== i && k !== j && l !== i && l !== j) {
                        const team1 = [players[i], players[j]];
                        const team2 = [players[k], players[l]];
                        const matchExists = matches.some(match =>
                            (JSON.stringify(match[1]) === JSON.stringify(team1) &&
                                JSON.stringify(match[2]) === JSON.stringify(team2)) ||
                            (JSON.stringify(match[1]) === JSON.stringify(team2) &&
                                JSON.stringify(match[2]) === JSON.stringify(team1))
                        );
                        if (!matchExists) {
                            matches.push([matches.length + 1, team1, team2]);
                        }
                    }
                }
            }
        }
    }

    return matches;
}

