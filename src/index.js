import R from 'ramda';

import parse from './logs/parse';
import { createArray, createObservable, createReadableStream } from './logs/_mocks';

import transduceArray from './transduce/array/transduceArray';
import transduceObservable from './transduce/observable/transduceObservable';
import transduceStream from './transduce/stream/transduceStream';


const transducer = parse;

/*
* =================
*     Array
* =================
* */

const input = createArray();

const output = transduceArray(transducer, R.flip(R.append), [], input);

console.group('Array');
R.map(console.log, output);
console.groupEnd();

/*
* =================
*     Observable
* =================
* */

const input$ = createObservable(createArray());

const output$ = transduceObservable(transducer, input$);

console.group('Observable');
output$.subscribe(console.log, null, console.groupEnd);

/*
* =================
*      Stream
* =================
* */

const inputStream = createReadableStream(createArray());

const outputStream = inputStream.pipe(transduceStream(transducer));

console.group('Stream');
outputStream.on('data', console.log);
outputStream.on('finish', console.groupEnd);
