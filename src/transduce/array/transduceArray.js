import R from 'ramda';

import wrap from '../utils/wrap';


const transduceArray = (transducer, stepper, init, input) => {
  const xf = transducer(typeof stepper === 'function' ? wrap(stepper): stepper);
  return R.reduce(xf, init, input);
};

export default transduceArray;
