import R from 'ramda';
import { appendHost, extractParts, isGet, isNonStatic, toString } from './logs/parse';
import fs from 'fs';

const input = fs.createReadStream('log.txt', { encoding: 'utf-8' });

const parse = R.pipe(
  R.map(extractParts),
  R.filter(isGet),
  R.filter(isNonStatic),
  R.map(appendHost),
  R.map(toString),
);

input.pipe(parse);
