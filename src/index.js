import fs from 'fs';
import R from 'ramda';

import LogInfo from "./logs/LogInfo";


const logs = fs.readFileSync('log.txt', { encoding: 'utf-8' });


const isGet = R.propEq('httpVerb', 'GET');

const isStatic = R.pipe(
  R.view(R.lensProp('path')),
  R.complement(R.test(/\/static\//)),
);

const parse = R.pipe(
  R.map(R.match(/.+"(\w+) (.+) (.+)" (\d{3})/)),
  R.map(R.append('https://example.com')),
  R.map(R.construct(LogInfo)),
  R.filter(isGet),
  R.filter(isStatic),
  R.map(R.toString),
  R.map(R.concat(R.__, '\n')),
);


const input = R.split('\n', logs);
const output = parse(input);


console.log(R.join('', output));
