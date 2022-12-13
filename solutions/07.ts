import { readRawInput, rotateClockwise } from '../helpers/';

const input: string = readRawInput('07');
let highestScenicScore = 0;

(function someTallFuckingTrees() {
    let trees = buildTreeGrid(input);
    let visibleTrees = 0;

    for (let row = 0; row < trees.length; row++) {
        for (let col = 0; col < trees[row].length; col++) {
            if (isTreeVisible(row, col, trees)) {
                visibleTrees++;
            }
        }
    }

    console.log(`Visible Tree Count: ${visibleTrees}`);
    console.log(`Highest Scenic Score: ${highestScenicScore}`);
})();

function isTreeVisible(rowIndex: number, colIndex: number, trees: number[][]): boolean {
    const tree = trees[rowIndex][colIndex];

    let left = scanLeft(rowIndex, colIndex, trees, tree);
    let right = scanRight(rowIndex, colIndex, trees, tree);
    let down = scanDown(rowIndex, colIndex, trees, tree);
    let up = scanUp(rowIndex, colIndex, trees, tree);

    let score = left.treeCount * right.treeCount * up.treeCount * down.treeCount;
    highestScenicScore = Math.max(highestScenicScore, score);

    return isEdge(rowIndex,colIndex,trees) || left.isTallest || right.isTallest || down.isTallest || up.isTallest;
}

function scanLeft(rowIndex: number, colIndex: number, trees: number[][], tree: number) {
    let isTallest = true;
    let treeCount = 0;
    for (let index = colIndex - 1; index >= 0; index--) {
        treeCount++;
        isTallest = isTreeTaller(tree, trees[rowIndex][index])
        if (!isTallest){            
            break;
        }
    }
    return {isTallest,treeCount}
}

function scanRight(rowIndex: number, colIndex: number, trees: number[][], tree: number) {
    let isTallest = true;
    let treeCount = 0;
    for (let index = colIndex + 1; index < trees[rowIndex].length; index++) {
        treeCount++;
        isTallest = isTreeTaller(tree, trees[rowIndex][index])
        if (!isTallest){            
            break;
        }
    }
    return {isTallest,treeCount}
}

function scanDown(rowIndex: number, colIndex: number, trees: number[][], tree: number) {
    let isTallest = true;
    let treeCount = 0;
    for (let index = rowIndex + 1; index < trees[rowIndex].length; index++) {
        treeCount++;
        isTallest = isTreeTaller(tree, trees[index][colIndex])
        if (!isTallest){            
            break;
        }
    }
    return {isTallest,treeCount}
}

function scanUp(rowIndex: number, colIndex: number, trees: number[][], tree: number) {
    let isTallest = true;
    let treeCount = 0;
    for (let index = rowIndex - 1; index >= 0; index--) {
        treeCount++;
        isTallest = isTreeTaller(tree, trees[index][colIndex])
        if (!isTallest){            
            break;
        }
    }
    return {isTallest,treeCount}
}

function isTreeTaller(tree: number, currentNeighbor: number){
    return currentNeighbor >= tree;
}

function buildTreeGrid(input: string): number[][] {
    return input.split('\n').map(trees => trees.split('').map(Number));
}

function isEdge(rowIndex: number, colIndex: number, trees: number[][]){
    return !rowIndex || !colIndex || rowIndex === trees.length -1 || colIndex === trees[0].length -1;
}