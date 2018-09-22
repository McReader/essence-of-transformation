import fs from 'fs';
import R from 'ramda';

import { isGet, isStatic } from './logs/utils'
import LogInfo from './logs/LogInfo';


const logs = fs.readFileSync('log.txt', { encoding: 'utf-8' });

const input = R.split('\n', logs);


const parseLogs = R.pipe(
  R.map(R.match(/.+"(\w+) (.+) (.+)" (\d{3})/)),
  R.map(R.append('https://example.com')),
  R.map(R.construct(LogInfo)),
  R.filter(isGet),
  R.filter(isStatic),
  R.map(R.toString),
  R.join('\n'),
);


const output = parseLogs(input);


console.log(output);
