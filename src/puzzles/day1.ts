import {input, testInput} from '../inputs/day1';

function parseLists(input: string): [number[], number[]] {
    const leftList: number[] = [];
    const rightList: number[] = [];

    input.split('\n').map((line) => {
        const [leftId, rightId] = line.split(/\s+/);
        leftList.push(parseInt(leftId));
        rightList.push(parseInt(rightId));
    });

    leftList.sort();
    rightList.sort();

    return [leftList, rightList];
}

function partOne(input: string): number {
    const [leftList, rightList] = parseLists(input);

    let distancesSum = 0;
    for (let i = 0; i < leftList.length; i++) {
        distancesSum += Math.abs(leftList[i] - rightList[i]);
    }

    return distancesSum;
}

function partTwo(input: string): number {
    const [leftList, rightList] = parseLists(input);

    let similarityScore = 0;

    for (const leftId of leftList) {
        similarityScore += rightList.filter((rightId) => rightId === leftId).length * leftId;
    }

    return similarityScore;
}

console.time('doSomething');

console.log(partOne(input));
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput) === 11, 'part1');
console.assert(partTwo(testInput) === 31, 'part2');
