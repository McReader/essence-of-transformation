import R from 'ramda';

export default function wrap(fn) {
  return {
    '@@transducer/init': () => {},
    '@@transducer/step': fn,
    '@@transducer/result': R.identity,
  };
}
