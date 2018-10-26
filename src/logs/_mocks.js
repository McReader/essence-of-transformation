import R from 'ramda';
import { of } from 'rxjs/observable/of';
import { Readable } from 'stream';

export const createArray = () => [
  '127.0.0.1 - - [26/Feb/2015 19:25:25] "GET /static/r.js HTTP/1.1" 304 -',
  '127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -',
  '127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -',
  '127.0.0.1 - - [28/Feb/2015 16:44:03] "POST / HTTP/1.1" 200 -',
];

export const createObservable = logs => of(...logs);

export const createReadableStream = logs => new Readable({
  encoding: 'utf-8',

  read() {
    R.forEach(value => this.push(value), logs);
    this.push(null);
  },
});
