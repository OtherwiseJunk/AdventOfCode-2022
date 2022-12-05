
const inputHelper = require('../helpers/inputHelpers');

(async function calculateTournamentResults() {
    const moves: string[] = inputHelper.readInputWithoutNewlines("01");
    var score = 0;
    Promise.all(moves.map(move => {
        const roundMoves = move.split(' ');
        score += calculateMovePoints(roundMoves[1]);
        score += calculateVictoryPoints(roundMoves[0], roundMoves[1]);
    }));

    console.log('Projected score: ' + score);
})();

(async function calculateTournmentResultsFromNeededOutcome(){
    const moves: string[] = inputHelper.readInputWithoutNewlines("01");
    var score = 0;
    await Promise.all(moves.map(move => {
        if(move != ''){
            const roundMoves = move.split(' ');
            score += getPointsForResult(roundMoves[1]);
            const neededMove = getMoveForResult(roundMoves[0], roundMoves[1]);
            score += calculateMovePoints(neededMove);
        }        
    }));

    console.log('Projected score given needed result:' + score);
})();

function calculateMovePoints(move: string): number {
    if (move === 'X') return 1;
    if (move === 'Y') return 2;
    if (move === 'Z') return 3;
    return 0;
}

function calculateVictoryPoints(theirMove: string, myMove: string) {
    if ((theirMove === 'A' && myMove === 'Y') || (theirMove === 'B' && myMove === 'Z') || (theirMove === 'C' && myMove === 'X')) {
        return 6;
    }
    if ((theirMove == 'A' && myMove == 'X') || (theirMove == 'B' && myMove == 'Y') || (theirMove == 'C' && myMove == 'Z')) {
        return 3;
    }
    return 0;
}

function getPointsForResult(result: string): number {
    switch (result) {
        case 'X':
            return 0
        case 'Y':
            return 3
        case 'Z':
            return 6
    }
}

function getMoveForResult(theirMove: string, result: string): string {
    if (result === 'X') {
        switch (theirMove) {
            case 'A':
                return 'Z';
            case 'B':
                return 'X';
            case 'C':
                return 'Y';
        }
    }
    else if (result === 'Y') {
        switch (theirMove) {
            case 'A':
                return 'X';
            case 'B':
                return 'Y';
            case 'C':
                return 'Z';
        }
    }
    else{
        switch (theirMove) {
            case 'A':
                return 'Y';
            case 'B':
                return 'Z';
            case 'C':
                return 'X';
        }
    }
}