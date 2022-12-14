const fs = require('fs');

export function readInputWithoutNewlines(day: string): string[]{
    const input: string = fs.readFileSync(`./input/${day}.txt`, 'utf-8');
    return input.split(/\r?\n/);
}

export function readRawInput(day: string): string{
    return fs.readFileSync(`./input/${day}.txt`, 'utf-8');
}