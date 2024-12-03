import {input, testInput} from '../inputs/day3';

function multiply(instruction: string): number {
    const factors = /mul\((\d{1,3}),(\d{1,3}\))/.exec(instruction);
    return parseInt(factors![1]) * parseInt(factors![2]);
}

function partOne(input: string): number {
    const instructions = input.match(/mul\(\d{1,3},\d{1,3}\)/g);

    let total = 0;

    for (const instruction of instructions!) {
        total += multiply(instruction);
    }

    return total;
}

function partTwo(input: string): number {
    const instructions = input.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g);

    let active = true;
    let total = 0;

    for (const instruction of instructions!) {
        switch (instruction) {
            case 'do()':
                active = true;
                break;
            case `don't()`:
                active = false;
                break;
            default:
                if (active) total += multiply(instruction);
        }
    }

    return total;
}

console.time('doSomething');

console.log(partOne(input));
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput) === 161, 'part1');
console.assert(partTwo(testInput) === 48, 'part2');
