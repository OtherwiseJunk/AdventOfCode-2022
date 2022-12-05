const inputHelper = require('../helpers/inputHelpers');
const rucksacks: string[] = inputHelper.readInputWithoutNewlines("02");

(async function findDuplicateItemPriority(){    
    var priority = 0;
    await Promise.all(rucksacks.map(rucksack =>{
        const firstCompartment = rucksack.substring(0, rucksack.length / 2);
        const secondCompartment = rucksack.substring(rucksack.length / 2, rucksack.length);
        for(var i = 0; i < firstCompartment.length; i++){
            if(secondCompartment.indexOf(firstCompartment[i]) != -1){
                priority += calculatePriority(firstCompartment[i]);
                break;
            }
        }
    }));
    console.log(`Total priority of misplaced items: ${priority}`);
})();

(async function findBadgeGroupPriority(){
    var priority = 0;
    for(var groupStartingIndex = 0; groupStartingIndex < rucksacks.length; groupStartingIndex += 3){
        const shortest = returnSmallestString(rucksacks[groupStartingIndex], rucksacks[groupStartingIndex+1], rucksacks[groupStartingIndex+2]);
        for(var item = 0; item < shortest.length; item++){
            const char = shortest[item];
            if(rucksacks[groupStartingIndex].indexOf(char) != -1 && rucksacks[groupStartingIndex+1].indexOf(char) != -1 && rucksacks[groupStartingIndex+2].indexOf(char) != -1){
                priority += calculatePriority(char);
                break;
            }
        }
    }
    console.log(`Total priority of badge groups: ${priority}`);
})();

function calculatePriority(item: string): number{
    const unicodeValue = item.charCodeAt(0);
    if(unicodeValue > 96){
        return unicodeValue - 96
    }
    return unicodeValue - 38
}

function returnSmallestString(one: string, two: string, three: string){
    if(one.length <= two.length && one.length <= three.length) return one;
    if(two.length <= one.length && two.length <= three.length) return two;
    return three;
}