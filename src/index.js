import fs from 'fs';

const logs = fs.readFileSync('log.txt', { encoding: 'utf-8' });

console.log(logs);
