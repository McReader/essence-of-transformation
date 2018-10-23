import R from 'ramda';
import { appendHost, extractParts, isGet, isNonStatic, toString } from './logs/parse';
import { Observable } from 'rxjs/Observable';

const input$ = Observable.of([]);

const parse = R.pipe(
  R.map(extractParts),
  R.filter(isGet),
  R.filter(isNonStatic),
  R.map(appendHost),
  R.map(toString),
);

input$.pipe(parse);
