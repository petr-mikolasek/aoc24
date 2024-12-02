import {input, testInput} from '../inputs/day2';

function isReportSafe(report: number[]): boolean {
    const sign = Math.sign(report[1] - report[0]);
    for (let i = 1; i < report.length; i++) {
        if (sign * (report[i] - report[i - 1]) < 1 || sign * (report[i] - report[i - 1]) > 3) {
            return false;
        }
    }
    return true;
}

function partOne(input: string): number {
    const reports: number[][] = input.split('\n').map((line) => line.split(/\s+/).map((level) => parseInt(level)));

    let safeCount = 0;
    for (const report of reports) {
        if (isReportSafe(report)) safeCount++;
    }

    return safeCount;
}

function partTwo(input: string): number {
    const reports: number[][] = input.split('\n').map((line) => line.split(/\s+/).map((level) => parseInt(level)));

    let safeCount = 0;
    for (const report of reports) {
        if (isReportSafe(report)) {
            safeCount++;
        } else {
            for (let i = 0; i < report.length; i++) {
                const smallerReport = [...report];
                smallerReport.splice(i, 1);
                if (isReportSafe(smallerReport)) {
                    safeCount++;
                    break;
                }
            }
        }
    }

    return safeCount;
}

console.time('doSomething');

console.log(partOne(input));
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput) === 2, 'part1');
console.assert(partTwo(testInput) === 4, 'part2');
