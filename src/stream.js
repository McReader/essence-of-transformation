import fs from 'fs';
import split from 'split';
import R from 'ramda';

import LogInfo from './logs/LogInfo';
import stream from './transduce/stream';


const isGet = R.propEq('httpVerb', 'GET');

const isNonStatic = R.pipe(
  R.view(R.lensProp('path')),
  R.complement(R.test(/\/static\//)),
);

const parse = R.compose(
  R.map(R.match(/.+"(\w+) (.+) (.+)" (\d{3})/)),
  R.map(R.append('https://example.com')),
  R.map(R.construct(LogInfo)),
  R.filter(isGet),
  R.filter(isNonStatic),
  R.map(R.toString),
);


fs
  .createReadStream('log.txt', { encoding: 'utf-8' })
  .pipe(split())
  .pipe(stream(parse))
  .pipe(process.stdout);
