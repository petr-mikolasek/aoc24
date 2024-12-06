import {input, testInput} from '../inputs/day6';
import {Coordinate} from '../stuff';

function findStart(map: string[][]): Coordinate {
    for (let y = 0; y < map.length; y++) {
        const x = map[y].indexOf('^');
        if (x >= 0) return {x, y};
    }

    throw new Error('Could find the start');
}

function directionCode(direction: Coordinate): string {
    return (2 + 2 * direction.y + direction.x).toString();
}

function partOne(input: string): {map: string[][]; startPosition: Coordinate; visitedPositions: number} {
    const map: string[][] = input.split('\n').map((line) => line.split(''));

    let visitedPositions = 1;

    const startPosition = findStart(map);
    const currentPosition = structuredClone(startPosition);
    let direction: Coordinate = {x: 0, y: -1};
    map[currentPosition.y][currentPosition.x] = 'X';

    while (
        currentPosition.y + direction.y >= 0 &&
        currentPosition.y + direction.y < map.length &&
        currentPosition.x + direction.x >= 0 &&
        currentPosition.x + direction.x < map[0].length
    ) {
        if (map[currentPosition.y + direction.y][currentPosition.x + direction.x] === '#') {
            direction = {x: -1 * direction.y, y: direction.x};
            continue;
        }

        currentPosition.y += direction.y;
        currentPosition.x += direction.x;
        if (map[currentPosition.y][currentPosition.x] !== 'X') {
            map[currentPosition.y][currentPosition.x] = 'X';
            visitedPositions++;
        }
    }

    return {map, startPosition, visitedPositions};
}

function partTwo(input: string): number {
    const {map: part1Map, startPosition} = partOne(input);
    let cyclicMaps = 0;

    for (let y = 0; y < part1Map.length; y++) {
        for (let x = 0; x < part1Map[0].length; x++) {
            if (!(part1Map[y][x] === 'X')) continue;
            const map = structuredClone(part1Map);
            map[y][x] = '#';
            const currentPosition = structuredClone(startPosition);
            let direction: Coordinate = {x: 0, y: -1};

            while (
                currentPosition.y + direction.y >= 0 &&
                currentPosition.y + direction.y < map.length &&
                currentPosition.x + direction.x >= 0 &&
                currentPosition.x + direction.x < map[0].length
            ) {
                if (map[currentPosition.y + direction.y][currentPosition.x + direction.x] === '#') {
                    direction = {x: -1 * direction.y, y: direction.x};
                    continue;
                }

                if (map[currentPosition.y][currentPosition.x] === directionCode(direction)) {
                    cyclicMaps++;
                    break;
                }
                map[currentPosition.y][currentPosition.x] = directionCode(direction);

                currentPosition.y += direction.y;
                currentPosition.x += direction.x;
            }
        }
    }

    return cyclicMaps;
}

console.time('doSomething');

console.log(partOne(input).visitedPositions);
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
const part1Test = partOne(testInput);
console.assert(part1Test.visitedPositions === 41, 'part1 number');
console.assert(
    part1Test.map.map((line) => line.join('')).join('\n') ===
        `....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..`,
    'part1 map'
);
console.assert(partTwo(testInput) === 6, 'part2');
