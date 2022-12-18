import { serialize } from 'v8';
import { readInputWithoutNewlines } from '../helpers/';

let input: string[] = readInputWithoutNewlines("09");
let cycleCount = 0;
let runningMultiCycleFunction = false;
let x = 1;
let signalStrength = 0;
let crt = generateFixedCRT();

(function clockingSomeCycles(){
    input.forEach(line =>{
        const command = line.split(" ");
        switch(command[0]){
            case "noop":
                cycleCount++;
                checkIfCycleShouldBeEvaluated();
                break;
            case "addx":
                cycleCount++;
                checkIfCycleShouldBeEvaluated();
                cycleCount++;                
                checkIfCycleShouldBeEvaluated();
                x += parseInt(command[1]);
                break;                
        }
    });
    console.log(`Sum of signal strengths: ${signalStrength}`)
})();

(function theProblemWithPixels(){
    cycleCount = 0;
    x = 1;
    let pos;

    for(let commandLine of input){
        const command = commandLine.split(" ");
        switch(command[0]){
            case "noop":
                cycleCount++;
                draw();
                break;
            case "addx":
                cycleCount++;
                draw();
                cycleCount++;                
                draw();
                x += parseInt(command[1]);
                break;                
        }
    };
    let row = "";
    for(let i = 0; i< crt.length; i++){
        for(let j = 0; j < crt[i].length; j++){
            row += crt[i][j];
        }
        console.log(row);
        row = "";
    }
})();

function draw(){    
    let pos = getCoordinateBasedOnCycle();
    crt[pos.row][pos.column] = checkIfPixelShouldBeDrawn(pos.column) ? "#" : ".";
}

function generateFixedCRT(): string[][]{
    let arr = []
    for(let i = 0; i < 6; i++){
        arr[i] = new Array(40);
        arr[i].fill("undefined");
    }
    Object.seal(arr);
    return arr;
}

function checkIfCycleShouldBeEvaluated(){
    if(cycleCount == 20 ||
       cycleCount == 60 ||
       cycleCount == 100 ||
       cycleCount == 140 ||
       cycleCount == 180 ||
       cycleCount == 220){
        signalStrength += x * cycleCount;
       }
}

function getCoordinateBasedOnCycle(){
    let row;
    let column;
    if(cycleCount <= 40){
        row = 0;
        column = cycleCount -1;
    }
    else if( cycleCount <= 80){
        row = 1;
        column = cycleCount - 41;
    }
    else if(cycleCount <= 120){
        row = 2;
        column = cycleCount -81;
    }
    else if( cycleCount <= 160){
        row = 3;
        column = cycleCount - 121;
    }
    else if(cycleCount <= 200){
        row = 4;
        column = cycleCount -161;
    }
    else if(cycleCount <= 240){
        row = 5;
        column = cycleCount - 201;
    }

    return {row, column};
}

function checkIfPixelShouldBeDrawn(position: number): boolean{
    return x === position || x -1 === position || x + 1 === position;
}