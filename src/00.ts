const events =require('events');
const fs =require('fs');
const readline =require('readline');

var elfNumber = 0;
var calorieTotals: number[] = new Array();
var rollingCalorieCount = 0;
var biggestCalorieCount = 0;
const newLineRegex = new RegExp('/[\n\r]/g');

(async function determineLargestCalorieCountFromInput() {
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

        calorieTotals.sort();
        console.log('Counted '+(elfNumber+1)+' Elves.')
        console.log('Calorie Totals Calculated: '+ calorieTotals.join('\n'));
        
        await Promise.all(calorieTotals.map(total =>{
            if(total > biggestCalorieCount){
                biggestCalorieCount = total;
            }
        }));

        console.log('Biggest calorie count: '+ biggestCalorieCount);

    }
catch (err) {
    console.error(err);
}
})();

export class deez{};