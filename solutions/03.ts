const inputHelper = require('../helpers/inputHelpers');
const arrayHelper = require('../helpers/arrayHelpers');
const searchPairs: string[] = inputHelper.readInputWithoutNewlines("03");

(async function countCompleteOverlaps() {
    var overlapCount = 0;
    await Promise.all(searchPairs.map(searchPair => {
        const pairs: string[] = searchPair.split(',');
        const firstRange: number[] = generateArrayInRange(pairs[0]);
        const secondRange: number[] = generateArrayInRange(pairs[1]);
        var overlapDetected = false;
        if(firstRange.length <= secondRange.length) overlapDetected = doArraysCompletelyOverlap(firstRange, secondRange)
        else overlapDetected = doArraysCompletelyOverlap(secondRange, firstRange)
        if (overlapDetected) overlapCount++;
    }));
    console.log('Total complete overlaps found: ' + overlapCount);
})();

(async function countAnyOverlaps() {
    var overlapCount = 0;
    await Promise.all(searchPairs.map(searchPair => {
        const pairs: string[] = searchPair.split(',');
        const firstRange: number[] = generateArrayInRange(pairs[0]);
        const secondRange: number[] = generateArrayInRange(pairs[1]);
        var overlapDetected = false;
        if(firstRange.length <= secondRange.length) overlapDetected = doArraysOverlapAtAll(firstRange, secondRange)
        else overlapDetected = doArraysOverlapAtAll(secondRange, firstRange)
        if (overlapDetected) overlapCount++;
    }));
    console.log('Total overlaps found: ' + overlapCount);
})();

function generateArrayInRange(range: string) {
    const rangeValues = range.split('-');
    const startRange = parseInt(rangeValues[0]);
    const endRange = parseInt(rangeValues[1]);
    return arrayHelper.range((endRange - startRange + 1), startRange)
}

function doArraysCompletelyOverlap(one: number[], two: number[]) {
    for (var i = 0; i < one.length; i++) {
        if (two.indexOf(one[i]) == -1) {
            return false;
        }
    }
    return true;
}

function doArraysOverlapAtAll(one: number[], two: number[]){
    for (var i = 0; i < one.length; i++) {
        if (two.indexOf(one[i]) != -1) {
            return true;
        }
    }
    return false;
}