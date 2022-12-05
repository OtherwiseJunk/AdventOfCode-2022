const fs = require('fs');

export function readInputWithoutNewlines(day: string): string[]{
    const input: string = fs.readFileSync(`./input/${day}.txt`, 'utf-8');
    return input.split(/\r?\n/);
}