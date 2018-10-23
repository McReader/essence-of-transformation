import R from 'ramda';
import { appendHost, extractParts, isGet, isNonStatic, toString } from './logs/parse';

const input = [];

const parse = R.pipe(
  R.map(extractParts),
  R.filter(isGet),
  R.filter(isNonStatic),
  R.map(appendHost),
  R.map(toString),
);

parse(input);
