import R from 'ramda';
import { of } from 'rxjs/observable/of';
import sinon from 'sinon';

import transduceArray from '../transduce/array/transduceArray';
import transduceObservable from '../transduce/rx/transduceObservable';
import transduceStream from '../transduce/stream/transduceStream';

import parse from './parse';
import { createReadableStream, logsArray } from './_mocks';


describe('parse logs', () => {
  describe('when input is array', () => {
    let input;
    let output;

    beforeAll(() => {
      input = logsArray;
    });

    beforeEach(() => {
      output = transduceArray(parse, R.flip(R.append), [], input);
    }); // call "parse" function

    it('should return string with logs in correct format', () => {
      expect(output).toEqual([
        'HTTP/1.1 visited https://example.com/blog/',
        'HTTP/1.1 visited https://example.com/',
      ]);
    });
  });

  describe('when input is observable', () => {
    let input;
    let onNext;

    beforeAll(() => {
      input = of(...logsArray);
      onNext = sinon.spy();
    });

    beforeEach((done) => {
      transduceObservable(parse, input).subscribe(onNext, null, done);
    }); // call "parse" function

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
    let onData;

    beforeAll(() => {
      onData = sinon.spy();
    });

    beforeEach((done) => {
      const input = createReadableStream(logsArray);
      const output = input.pipe(transduceStream(parse));

      output.on('data', onData);
      output.on('finish', done);
    });  // call "parse" function

    afterEach(() => {
      onData.resetHistory();
    });

    it('should call onData twice', () => {
      expect(onData.calledTwice).toBe(true);
    });

    it('should call onNext with logs in correct format', () => {
      expect(onData.getCall(0).args[0]).toBe('HTTP/1.1 visited https://example.com/blog/');
      expect(onData.getCall(1).args[0]).toBe('HTTP/1.1 visited https://example.com/');
    });
  });
});
