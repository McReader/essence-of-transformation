import {of} from 'rxjs/observable/of';
import R from 'ramda';
import sinon from 'sinon';

import parse from './parse';

import observable from '../transduce/observable';


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
        'HTTP/1.1 visited https://example.com/blog/',
        'HTTP/1.1 visited https://example.com/',
      ]);
    });
  });

  describe('when input is observable', () => {
    let next;

    beforeAll(() => {
      input = of(
        '127.0.0.1 - - [26/Feb/2015 19:25:25] "GET /static/r.js HTTP/1.1" 304 -',
        '127.0.0.5 - - [26/Feb/2015 19:27:35] "GET /blog/ HTTP/1.1" 200 -',
        '127.0.0.1 - - [28/Feb/2015 16:44:03] "GET / HTTP/1.1" 200 -',
        '127.0.0.1 - - [28/Feb/2015 16:44:03] "POST / HTTP/1.1" 200 -',
      );

      next = sinon.spy();
    });

    beforeEach((done) => {
      observable(parse, input).subscribe(next, null, done);
    });

    afterEach(() => {
      next.resetHistory();
    });

    it('should call next twice', () => {
      expect(next.calledTwice).toBe(true);
    });

    it('should call next with logs in correct format', () => {
      expect(next.getCall(0).args[0]).toBe('HTTP/1.1 visited https://example.com/blog/');
      expect(next.getCall(1).args[0]).toBe('HTTP/1.1 visited https://example.com/');
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
