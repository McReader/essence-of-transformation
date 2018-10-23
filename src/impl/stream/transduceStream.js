import { Transform } from 'stream';

const stepper = {
  '@@transducer/init': null,
  '@@transducer/step': (stream, input) => {
    stream.push(input);
  },
  '@@transducer/result': null,
};

const transduceStream = (transducer) => {
  const xf = transducer(stepper);

  return new Transform({
    encoding: 'utf-8',

    decodeStrings: false,

    transform(chunk, encoding, callback) {
      xf['@@transducer/step'](this, chunk);
      callback();
    },
  });
};

export default transduceStream;
