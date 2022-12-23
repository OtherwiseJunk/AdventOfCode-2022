import { readInputWithoutNewlines } from '../helpers/';

class Monkey{
    items: number[];
    operation: string;
    divisibleBy: number;
    trueMonkey: number;
    falseMonkey: number;
    constructor(items: number[], operation: string, divisibleBy: number, trueMonkey: number, falseMonkey: number){
        this.items = items;
        this.operation = operation;
        this.divisibleBy = divisibleBy;
        this.trueMonkey = trueMonkey;
        this.falseMonkey = falseMonkey;
    }

    public inspect(item: number): number{
        let operation:string[] = this.operation.replace(/old/g, item.toString()).split(' ');
        switch(operation[1]){
            case '*':
                return Number(operation[0]) * Number(operation[2])
            case '+':
                return Number(operation[0]) + Number(operation[2])
        }
    }

    public test(item: number): boolean{
        return item % this.divisibleBy === 0;
    }
}

let input: string[] = readInputWithoutNewlines("10");
let monkeys: Monkey[];
let interactionCount: number[];

(function monkeyBusiness(){
    monkeys = parseMonkeys(input);
    interactionCount = new Array(monkeys.length).fill(0);

    for(let i = 0; i < 20; i++){

        for(let j = 0; j < monkeys.length; j++){
            
            let monkey = monkeys[j];
            let items = [...monkey.items];

            for(let k = 0; k < items.length; k++){                

                let newWorries = monkey.inspect(items[k]);
                newWorries = Math.floor(newWorries / 3);
                monkey.items.pop();
                const tossTarget = monkey.test(newWorries) ? monkey.trueMonkey : monkey.falseMonkey;
                monkeys[tossTarget].items.push(newWorries);
                interactionCount[j]++;

            }
        }
    }

    interactionCount.sort( (a, b) => {return b-a })
    console.log(`How much Monkey Business after 20 rounds? ${interactionCount[0] * interactionCount[1]}`);
})();

(function moreWorryingMonkeyBusiness(){
    monkeys = parseMonkeys(input);
    interactionCount = new Array(monkeys.length).fill(0);
    const lcm: number = monkeys.map(monkey => monkey.divisibleBy).reduce((a, x) => a*x)

    for(let i = 0; i < 10000; i++){

        for(let j = 0; j < monkeys.length; j++){
            
            let monkey = monkeys[j];
            let items = [...monkey.items];

            for(let k = 0; k < items.length; k++){                

                let newWorries = monkey.inspect(items[k]);
                monkey.items.pop();
                const tossTarget = monkey.test(newWorries) ? monkey.trueMonkey : monkey.falseMonkey;
                monkeys[tossTarget].items.push(newWorries % lcm);
                interactionCount[j]++;

            }
        }
    }

    interactionCount.sort( (a, b) => {return b-a })
    console.log(`How much Monkey Business after 10,000 rounds? ${interactionCount[0] * interactionCount[1]}`);
})();

function parseMonkeys(input: string[]): Monkey[]{
    let monkies: Monkey[] = [];
    for(let i = 0; i < input.length; i += 7){
        let items: number[] = input[i+1].split(': ')[1].split(', ').map(value =>{return Number(value.trim())});
        let operation = input[i+2].split(': new = ')[1];
        let test = Number(input[i+3].split('by ')[1]);
        let trueMonkey = Number(input[i+4].split('monkey ')[1]);
        let falseMonkey = Number(input[i+5].split('monkey ')[1]);
        
        monkies.push(new Monkey(items, operation, test, trueMonkey, falseMonkey));
    }

    return monkies;
}