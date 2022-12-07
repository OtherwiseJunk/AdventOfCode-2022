import { readRawInput } from '../helpers/inputHelpers';

const inputFile: string = readRawInput('05');

(function wowElvesAreReallyHighTech() {
    for(var i = 0; i< inputFile.length; i++){
        if(areAllUnique(inputFile.slice(i,i+4))){
            console.log(`Found a unique string of 4 characters ending at index ${i+3}`);
            console.log(inputFile.slice(i,i+4));
            break;
        }
    }
})();

(function gotPrettyLuckyWithMyHelperFunction() {
    for(var i = 0; i< inputFile.length; i++){
        if(areAllUnique(inputFile.slice(i,i+14))){
            console.log(`Found a unique string of 14 characters ending at index ${i+13}`);
            console.log(inputFile.slice(i,i+14));
            break;
        }
    }
})();

function areAllUnique(characters: string){
    var unique = '';
    for(var i = 0; i < characters.length; i++){
        if(unique.indexOf(characters[i]) == -1){
            unique += characters[i];
        }
    }

    return unique.length === characters.length;
}