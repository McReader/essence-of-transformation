import { of } from 'rxjs/observable/of';
import R from 'ramda';
import sinon from 'sinon';
import { Readable } from 'stream';

import parse from './parse';

import transduceArray from '../impl/default/transduceArray';
import transduceObservable from '../impl/rx/transduceObservable';
import transduceStream from '../impl/stream/transduceStream';


describe('parse logs', () => {
  let input;

  describe('when input is array', () => {
    let output;

    beforeAll(() => {
      input = [
        '127.0.0.1 - - [26/Feb/2015 19:25:25] "GET /static/r.js HTTP/1.1" 304 -',
        '127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -',
        '127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -',
        '127.0.0.1 - - [28/Feb/2015 16:44:03] "POST / HTTP/1.1" 200 -',
      ];
    });

    beforeEach(() => {
      output = transduceArray(parse, R.flip(R.append), [], input);
    });

    it('should return string with logs in correct format', () => {
      expect(output).toEqual([
        'HTTP/1.1 visited https://example.com/blog/',
        'HTTP/1.1 visited https://example.com/',
      ]);
    });
  });

  describe('when input is observable', () => {
    let onNext;

    beforeAll(() => {
      input = of(
        '127.0.0.1 - - [26/Feb/2015 19:25:25] "GET /static/r.js HTTP/1.1" 304 -',
        '127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -',
        '127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -',
        '127.0.0.1 - - [28/Feb/2015 16:44:03] "POST / HTTP/1.1" 200 -',
      );

      onNext = sinon.spy();
    });

    beforeEach((done) => {
      transduceObservable(parse, input).subscribe(onNext, null, done);
    });

    afterEach(() => {
      onNext.resetHistory();
    });

    it('should call onNext twice', () => {
      expect(onNext.calledTwice).toBe(true);
    });

    it('should call onNext with logs in correct format', () => {
      expect(onNext.getCall(0).args[0]).toBe('HTTP/1.1 visited https://example.com/blog/');
      expect(onNext.getCall(1).args[0]).toBe('HTTP/1.1 visited https://example.com/');
    });
  });

  describe('when input is stream', () => {
    beforeAll(() => {
      const encoding = 'utf-8';

      input = new Readable({
        read() {
          this.push('127.0.0.1 - - [26/Feb/2015 19:25:25] "GET /static/r.js HTTP/1.1" 304 -', encoding);
          this.push('127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -', encoding);
          this.push('127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -', encoding);
          this.push('127.0.0.1 - - [28/Feb/2015 16:44:03] "POST / HTTP/1.1" 200 -', encoding);
          this.push(null);
        },
      });
    });

    it('should be fine', () => {
      input.on('data', (v) => console.log(v));
    });
  });
});
