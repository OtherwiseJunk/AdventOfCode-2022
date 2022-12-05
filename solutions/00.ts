const events = require('events');
const fs = require('fs');
const readline = require('readline');

var biggestCalorieCount = 0;
const newLineRegex = new RegExp('/[\n\r]/g');

(async function determineLargestCalorieCountFromInput() {
    const calorieTotals = await buildElfCalorieTotalsFromInput()
    const biggestCalorieCount =  getLargestValue(calorieTotals);
    console.log('Biggest calorie count: ' + biggestCalorieCount);
})();

// This is not the most efficient but IDC about 3n vs n 😎
(async function determineThreeLargestCalorieCountTotalFromInput(){
    var calorieTotals = await buildElfCalorieTotalsFromInput()
    const firstLargest = getLargestValue(calorieTotals);
    calorieTotals = dropValueFromArray(firstLargest, calorieTotals);
    const secondLargest = getLargestValue(calorieTotals);
    calorieTotals = dropValueFromArray(secondLargest, calorieTotals);
    const thirdLargest = getLargestValue(calorieTotals);
    console.log('Three biggest calorie count total: ' + (firstLargest + secondLargest + thirdLargest));
})();

function dropValueFromArray(value, array): number[]{
    const index = array.indexOf(value);
    array.splice(index,1);
    return array;
}

function getLargestValue(numArray: number[]) {
    var biggestValue = 0;
    numArray.forEach(value => {
        if (value > biggestValue) {
            biggestValue = value;
        }
    });

    return biggestValue;
}

async function buildElfCalorieTotalsFromInput(): Promise<number[]> {
    var elfNumber = 0;
    var calorieTotals: number[] = [];
    var rollingCalorieCount = 0;

    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('./input/00.txt'),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            if (line === '') {
                calorieTotals[elfNumber] = rollingCalorieCount;
                elfNumber++;
                rollingCalorieCount = 0;
            }
            else {
                rollingCalorieCount += parseInt(line);
            }
        });
        await events.once(rl, 'close');

        return calorieTotals;
    }
    catch (err) {
        console.error(err);
    }
}