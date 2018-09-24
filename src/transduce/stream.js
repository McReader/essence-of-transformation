import { Transform } from 'stream';
import R from 'ramda';


const transformer = {
  '@@transducer/init': R.always(null),
  '@@transducer/step': (stream, input) => {
    stream.push(input);
  },
  '@@transducer/result': R.identity,
};


/**
 * @param {function} transducer
 * @return {stream.Transform}
 */
export default function stream(transducer) {
  const xf = transducer(transformer);

  return new Transform({
    encoding: 'utf-8',

    decodeStrings: false,

    transform(chunk, encoding, callback) {
      xf['@@transducer/step'](this, chunk);
      callback();
    },
  });
}
