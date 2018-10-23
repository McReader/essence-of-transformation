import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { extractParts, isGet, isNonStatic, appendHost, toString } from '../logs/parse';

const input$ = Observable.of([]);

input$.pipe(
  map(extractParts),
  filter(isGet),
  filter(isNonStatic),
  map(appendHost),
  map(toString),
);
