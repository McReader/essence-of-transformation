import R from 'ramda';
import wrap from '../../utils/wrap';

const transduceArray = (transducer, stepper, init, input) => {
  if (R.is(Function, stepper)) {
    stepper = wrap(stepper);
  }

  const transformer = transducer(stepper);

  return R.reduce(
    transformer['@@transducer/step'],
    init,
    input,
  );
};

export default transduceArray;
