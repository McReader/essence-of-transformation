import R from 'ramda';
import { of } from 'rxjs/observable/of';

import parse from './logs/parse';
import { createReadableStream, logsArray } from './logs/_mocks';

import transduceArray from './transduce/array/transduceArray';
import transduceObservable from './transduce/rx/transduceObservable';
import transduceStream from './transduce/stream/transduceStream';


const transducer = parse;

/*
* =================
*     Array
* =================
* */

const input = logsArray;

const output = transduceArray(transducer, R.flip(R.append), [], input);

console.group('Array');
R.map(console.log, output);
console.groupEnd();

/*
* =================
*     Observable
* =================
* */

const input$ = of(...logsArray);

const output$ = transduceObservable(transducer, input$);

console.group('Observable');
output$.subscribe(console.log, null, console.groupEnd);

/*
* =================
*      Stream
* =================
* */

const inputStream = createReadableStream(logsArray);

const outputStream = inputStream.pipe(transduceStream(transducer));

console.group('Stream');
outputStream.on('data', console.log);
outputStream.on('finish', console.groupEnd);
