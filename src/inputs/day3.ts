import fs from 'fs';

export const input = fs.readFileSync('src/inputs/day3.txt').toString();

export const testInput = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
