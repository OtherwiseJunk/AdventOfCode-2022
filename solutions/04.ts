const inputHelper = require('../helpers/inputHelpers');
const inputFile: string = inputHelper.readRawInput('04');

(async function ILikeCranesAndStacks(){
    const inputs = inputFile.split('\n\n');
    var stacks = extractStackArrayFromStartingState(inputs[0]);
})();

function extractStackArrayFromStartingState(startingStacksState){
    const stacks = startingStacksState.split('\n');
    stacks.pop() // Get rid of the labels
    const stackEntries = stacks.map((row) =>{
        row = row.replace(' ','0');
    })

    return null;
}