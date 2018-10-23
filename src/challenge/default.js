import R from 'ramda';
import { extractParts, isGet, isNonStatic, appendHost, toString } from '../logs/parse'

const input = [];

R.pipe(
  R.map(extractParts),
  R.filter(isGet),
  R.filter(isNonStatic),
  R.map(appendHost),
  R.map(toString),
)(input);
