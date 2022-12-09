import { readRawInput, rotateClockwise } from '../helpers/';

const input: string = readRawInput('07');

(function someTallFuckingTrees() {
    let trees = buildTreeGrid(input);
    let visibleTrees = ((trees.length * 2) + (trees[0].length * 2)) - 4;
    
    for(let row = 1; row < trees.length - 1; row++){
        for(let col = 1; col < trees[row].length - 1; col++){
            if(isTreeVisible(row,col,trees)){
                visibleTrees++;
            }
        }
    }

    console.log(`Visible Tree Count: ${visibleTrees}`);
})();

function isTreeVisible(rowIndex: number, colIndex: number, trees: number[][]): boolean{
    if(isEdgeTree(rowIndex,colIndex,trees)) return true;

    let left = scanLeft(rowIndex,colIndex,trees);
    let right = scanRight(rowIndex,colIndex,trees);
    let down = scanDown(rowIndex,colIndex,trees);
    let up = scanUp(rowIndex,colIndex,trees);

    return left || right || down || up;
}

function scanLeft(rowIndex: number, colIndex: number, trees: number[][]){
    for(let index = colIndex -1; index >= 0; index--){
        if(trees[rowIndex][index] >= trees[rowIndex][colIndex])
            return false;
    }
    return true;
}

function scanRight(rowIndex: number, colIndex: number, trees: number[][]){
    for(let index = colIndex + 1; index <= trees[rowIndex].length; index++){
        if(trees[rowIndex][index] >= trees[rowIndex][colIndex])
            return false;
    }
    return true;
}

function scanDown(rowIndex: number, colIndex: number, trees: number[][]){
    for(let index = rowIndex -1; index <= trees[rowIndex].length; index++){
        if(trees[index][colIndex] >= trees[rowIndex][colIndex])
            return false;
    }
    return true;
}

function scanUp(rowIndex: number, colIndex: number, trees: number[][]){
    for(let index = rowIndex -1; index >= 0; index--){
        if(trees[index][colIndex] >= trees[rowIndex][colIndex])
            return false;
    }
    return true;
}

function buildTreeGrid(input: string):number[][] {
    return input.split('\n').map( trees => trees.split('').map(Number) );
}

function isEdgeTree(row:number,col:number,trees:number[][]): boolean {
    return (!row || !col || ( row === trees.length -1 ) || ( col === trees[row].length -1 ) )
}