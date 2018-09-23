import fs from 'fs';
import R from 'ramda';

import parse from './logs/parse'


const logs = fs.readFileSync('log.txt', { encoding: 'utf-8' });
const input = R.split('\n', logs);


const output = R.transduce(parse, R.join('\n'), '', input);


console.log(output);
