import {input, testInput} from '../inputs/day5';

function parseInput(input: string): [number[][], number[][]] {
    const [rawRules, rawUpdates] = input.split('\n\n');

    const rules = rawRules.split('\n').map((rule) => rule.split('|').map((page) => parseInt(page)));
    const updates = rawUpdates.split('\n').map((update) => update.split(',').map((page) => parseInt(page)));

    return [rules, updates];
}

function conformsToRule(update: number[], rule: number[]): boolean {
    const lowPageIndex = update.indexOf(rule[0]);
    const highPageIndex = update.indexOf(rule[1]);

    if (lowPageIndex >= 0 && highPageIndex >= 0) {
        if (lowPageIndex > highPageIndex) return false;
    }

    return true;
}

function applyRule(update: number[], rule: number[]): void {
    const lowPageIndex = update.indexOf(rule[0]);
    const highPageIndex = update.indexOf(rule[1]);

    if (lowPageIndex >= 0 && highPageIndex >= 0 && lowPageIndex > highPageIndex) {
        const movedPage = update.splice(lowPageIndex, 1)[0];
        update.splice(highPageIndex, 0, movedPage);
    }
}

function conformsToRules(update: number[], rules: number[][]): boolean {
    for (const rule of rules) {
        if (!conformsToRule(update, rule)) {
            return false;
        }
    }
    return true;
}

function partOne(input: string): number {
    const [rules, updates] = parseInput(input);
    let middlePageSum = 0;

    for (const update of updates) {
        if (conformsToRules(update, rules)) {
            middlePageSum += update[(update.length - 1) / 2];
        }
    }

    return middlePageSum;
}

function partTwo(input: string): number {
    const [rules, updates] = parseInput(input);
    let middlePageSum = 0;
    for (const update of updates) {
        if (!conformsToRules(update, rules)) {
            while (!conformsToRules(update, rules)) {
                for (const rule of rules) {
                    applyRule(update, rule);
                }
            }

            middlePageSum += update[(update.length - 1) / 2];
        }
    }

    return middlePageSum;
}

console.time('doSomething');

console.log(partOne(input));
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput) === 143, 'part1');
console.assert(partTwo(testInput) === 123, 'part2');
