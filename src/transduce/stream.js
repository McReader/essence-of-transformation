import { Transform } from 'stream';
import R from 'ramda';


const transformer = {
  '@@transducer/init': R.always(null),
  '@@transducer/step': (stream, input) => {
    console.log(input);
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
    transform(chunk, encoding, callback) {
      xf['@@transducer/step'](this, chunk);
      callback();
    },
  });
}
