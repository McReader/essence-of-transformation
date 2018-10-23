import R from 'ramda';
import transduceStream from '../impl/stream/transduceStream';
import { Readable } from "stream";

const encoding = 'utf-8';

const input = new Readable({
  read() {
    this.push('127.0.0.1 - - [26/Feb/2015 19:25:25] "GET /static/r.js HTTP/1.1" 304 -', encoding);
    this.push('127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -', encoding);
    this.push('127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -', encoding);
    this.push('127.0.0.1 - - [28/Feb/2015 16:44:03] "POST / HTTP/1.1" 200 -', encoding);
    this.push(null);
  },
});

const transducer = R.compose(R.map(Number), R.add(1), R.toString);

input.pipe(transduceStream(transducer).pipe(process.stdout);
