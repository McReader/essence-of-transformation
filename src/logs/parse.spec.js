import R from 'ramda';
import sinon from 'sinon';

import transduceArray from '../transduce/array/transduceArray';
import transduceObservable from '../transduce/observable/transduceObservable';
import transduceStream from '../transduce/stream/transduceStream';

import parse from './parse';
import { createArray, createObservable, createReadableStream } from './_mocks';


describe('parse logs', () => {
  describe('when input is array', () => {
    let output;

    beforeEach(() => {
      const input = createArray();
      output = transduceArray(parse, R.flip(R.append), [], input);
    }); // call "parse" function

    it('should return string with logs in correct format', () => {
      expect(output).toEqual([
        '127.0.0.5 visited https://example.com/blog/',
        '127.0.0.1 visited https://example.com/',
      ]);
    });
  });

  describe('when input is observable', () => {
    let onNext;

    beforeAll(() => {
      onNext = sinon.spy();
    });

    beforeEach((done) => {
      const input = createObservable(createArray());
      transduceObservable(parse, input).subscribe(onNext, null, done);
    }); // call "parse" function

    afterEach(() => {
      onNext.resetHistory();
    });

    it('should call onNext twice', () => {
      expect(onNext.calledTwice).toBe(true);
    });

    it('should call onNext with logs in correct format', () => {
      expect(onNext.getCall(0).args[0]).toBe('127.0.0.5 visited https://example.com/blog/');
      expect(onNext.getCall(1).args[0]).toBe('127.0.0.1 visited https://example.com/');
    });
  });

  describe('when input is stream', () => {
    let onData;

    beforeAll(() => {
      onData = sinon.spy();
    });

    beforeEach((done) => {
      const input = createReadableStream(createArray());
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
      expect(onData.getCall(0).args[0]).toBe('127.0.0.5 visited https://example.com/blog/');
      expect(onData.getCall(1).args[0]).toBe('127.0.0.1 visited https://example.com/');
    });
  });
});
