import { readRawInput } from '../helpers/inputHelpers';
import { transpose } from 'ramda';

const inputFile: string = readRawInput('04');

(function ILikeCranesAndStacks(){
    const inputs = inputFile.split('\r\n\r\n');
    var stacks = extractStackArrayFromStartingState(inputs[0]);
    var moves = inputs[1].split('\r\n');
    moves.forEach(move =>{
        const moveDigits = move.match(/\d+/g).map(match =>{
            return parseInt(match);
        });
        const boxesToGrab = moveDigits[0];
        const fromStack = moveDigits[1] - 1;
        const toStack = moveDigits[2] - 1;
        for(var i = 0; i< boxesToGrab; i++){
            stacks[toStack].push(stacks[fromStack].pop());
        }
    });
    console.log('Single Crane solution');
    stacks.forEach(stack =>{
        console.log(stack.pop());
    })
})();

(function MULTICRANE(){
    const inputs = inputFile.split('\r\n\r\n');
    var stacks = extractStackArrayFromStartingState(inputs[0]);
    var moves = inputs[1].split('\r\n');
    moves.forEach(move =>{
        const moveDigits = move.match(/\d+/g).map(match =>{
            return parseInt(match);
        });
        const boxesToGrab = moveDigits[0];
        const fromStack = moveDigits[1] - 1;
        const toStack = moveDigits[2] - 1;
        const fromLength = stacks[fromStack].length;
        stacks[toStack].push(...stacks[fromStack].splice(fromLength - boxesToGrab, boxesToGrab));
    });
    console.log('MULTICRANE solution');
    stacks.forEach(stack =>{
        console.log(stack.pop());
    })
})();

function extractStackArrayFromStartingState(startingStacksState){
    const stacks = startingStacksState.split('\n');
    stacks.pop() // Get rid of the labels
    const stackEntries = stacks.map((row: string) =>{
        const items = row.split(/ {1,4}/gm); // get a single '' for each empty value in stack, otherwise actual value
        return items.map(item =>{
            if(item) return item.replace(/\[|\]/gm, '').replace('\r', ''); //if not '', return bracketless entry
            return;
        });
    })

    return transpose(stackEntries).map((e) => e.filter(Boolean).reverse()) as string[][]
}