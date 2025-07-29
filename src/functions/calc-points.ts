const WIN_POINTS = 3;
const DRAW_POINTS = 1;
const LOSS_POINTS = 0;

export function getPoints(data: any) {

    const playerPoints: {
        [key: string]: {
            winMatches: number,
            lossMatches: number,
            drawMatches: number,
            points: number,
            smallPoints: number
        }
    } = {};
    if(!data) return playerPoints;

    data.forEach((match: any) => {
        if (match.firstPoints === undefined || match.secondPoints === undefined) {
            [...match.firstHalf, ...match.secondHalf].forEach((player: string) => {
                if (!playerPoints[player]) {
                    playerPoints[player] = {
                        winMatches: 0,
                        lossMatches: 0,
                        drawMatches: 0,
                        points: 0,
                        smallPoints: 0
                    };
                }
            });
            return;
        }

        const firstPoints = match.firstPoints;
        const secondPoints = match.secondPoints;

        const result = firstPoints > secondPoints ? WIN_POINTS : (firstPoints < secondPoints ? LOSS_POINTS : DRAW_POINTS);

        match.firstHalf.forEach((player: string) => {
            if (!playerPoints[player]) {
                playerPoints[player] = {winMatches: 0, lossMatches: 0, drawMatches: 0, points: 0, smallPoints: 0};
            }
            playerPoints[player].points += result === DRAW_POINTS ? DRAW_POINTS : (result > DRAW_POINTS ? WIN_POINTS : LOSS_POINTS);
            playerPoints[player].smallPoints += firstPoints - secondPoints;

            if (result === WIN_POINTS) {
                playerPoints[player].winMatches += 1;
            } else if (result === LOSS_POINTS) {
                playerPoints[player].lossMatches += 1;
            } else {
                playerPoints[player].drawMatches += 1;
            }
        });

        match.secondHalf.forEach((player: string) => {
            if (!playerPoints[player]) {
                playerPoints[player] = {winMatches: 0, lossMatches: 0, drawMatches: 0, points: 0, smallPoints: 0};
            }
            playerPoints[player].points += result === DRAW_POINTS ? DRAW_POINTS : (result < DRAW_POINTS ? WIN_POINTS : LOSS_POINTS);
            playerPoints[player].smallPoints += secondPoints - firstPoints;

            if (result === WIN_POINTS) {
                playerPoints[player].lossMatches += 1;
            } else if (result === LOSS_POINTS) {
                playerPoints[player].winMatches += 1;
            } else {
                playerPoints[player].drawMatches += 1;
            }
        });
    });

    return playerPoints;
}