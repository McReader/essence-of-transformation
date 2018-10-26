import R from 'ramda';
// import wrap from '../utils/wrap';

const transduceArray = (transducer, stepper, init, input) => {
  return R.transduce(transducer, stepper, init, input);
  // if (typeof stepper === 'function') {
  //   stepper = wrap(stepper);
  // }
  //
  // const transformer = transducer(stepper);
  //
  // return R.reduce(
  //   transformer['@@transducer/step'],
  //   init,
  //   input,
  // );
};

export default transduceArray;
