import { readInputWithoutNewlines } from '../helpers/';
let TAIL_CNT = 1;
let moves = [];
let hX = 0;
let hY = 0;
let visited = new Set(["0/0"]);
let tails = [[0, 0]];

for (const line of readInputWithoutNewlines("08")) {
    const directionQuantityCombo = line.split(" ");
    moves.push([directionQuantityCombo[0], parseInt(directionQuantityCombo[1])]);
}

(function thisBridgeSucks() {

    for (const [direction, steps] of moves) {
        for (let n = 0; n < steps; n++) {
            moveHead(direction);
        }
    }

    console.log(`Tail visted ${visited.size} unique locations.`)

})();

(function ohGodOhFuck() {
    TAIL_CNT = 9;
    hX = 0;
    hY = 0;
    visited = new Set(["0/0"]);
    tails = [];

    for (let i = 0; i < TAIL_CNT; i++) {
        tails.push([0, 0]);
    }

    for (const [direction, steps] of moves) {
        for (let n = 0; n < steps; n++) {
            moveHead(direction);
        }
    }

    console.log(`After the rope-snap situation, the tail visited ${visited.size} unique locations.`)
})();

function moveHead(direction) {
    switch (direction) {
        case "U":
            hY = hY + 1;
            break;
        case "D":
            hY = hY - 1;
            break;
        case "L":
            hX = hX - 1;
            break;
        case "R":
            hX = hX + 1;
            break;
    }

    for (let i = 0; i < TAIL_CNT; i++) {
        moveTail(i);

        if (i === TAIL_CNT - 1) {
            let [lasttX, lasttY] = tails[TAIL_CNT - 1];
            visited.add(`${lasttX}/${lasttY}`);
        }
    }
};

function moveTail(position) {
    let [tX, tY] = tails[position];

    let refX = 0;
    let refY = 0;

    if (position > 0) {
        let [prevtX, prevtY] = tails[position - 1];
        refX = prevtX;
        refY = prevtY;
    } else {
        refX = hX;
        refY = hY;
    }

    let diffX = Math.abs(refX - tX);
    let diffY = Math.abs(refY - tY);

    if (diffX < 2 && diffY < 2) {
        return;
    }

    if (diffX > 1 && !diffY) {
        tX += refX - tX > 0 ? 1 : -1;
    } else if (diffY > 1 && !diffX) {
        tY += refY - tY > 0 ? 1 : -1;
    } else {
        tX += refX - tX > 0 ? 1 : -1;
        tY += refY - tY > 0 ? 1 : -1;
    }

    tails[position] = [tX, tY];
};
