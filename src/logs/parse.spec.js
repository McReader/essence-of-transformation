import {of} from 'rxjs/observable/of';
import R from 'ramda';
import sinon from 'sinon';

import parse from './parse';

import transduce from '../transduce/observable/transduce';
import lines from '../transduce/string/lines';


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
      output = R.transduce(parse, R.flip(R.append), [], input);
    });

    it('should return string with logs in correct format', () => {
      expect(output).toEqual([
        'HTTP/1.1 visited https://example.com/blog/\n',
        'HTTP/1.1 visited https://example.com/\n',
      ]);
    });
  });

  describe('when input is string', () => {
    let output;

    beforeAll(() => {
      input = `127.0.0.1 - - [26/Feb/2015 19:25:25] "GET /static/r.js HTTP/1.1" 304 -
        127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -
        127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -
        127.0.0.1 - - [28/Feb/2015 16:44:03] "POST / HTTP/1.1" 200 -`;
    });

    beforeEach(() => {
      output = lines(parse, R.concat, '', input);
    });

    it('should return a string with filtered logs in correct format', () => {
      expect(output).toBe(`HTTP/1.1 visited https://example.com/blog/\nHTTP/1.1 visited https://example.com/\n`);
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
      transduce(parse, input).subscribe(onNext, null, done);
    });

    afterEach(() => {
      onNext.resetHistory();
    });

    it('should call onNext twice', () => {
      expect(onNext.calledTwice).toBe(true);
    });

    it('should call onNext with logs in correct format', () => {
      expect(onNext.getCall(0).args[0]).toBe('HTTP/1.1 visited https://example.com/blog/\n');
      expect(onNext.getCall(1).args[0]).toBe('HTTP/1.1 visited https://example.com/\n');
    });
  });

  describe('when input is iterator', () => {
    beforeAll(() => {
      input = {
        next: () => {},
      };
    });
  });
});
