import R from 'ramda';
import wrap from '../utils/wrap';
import transduceArray from '../impl/default/transduceArray';

const transducer = R.map(R.add(1));
const stepper = wrap(R.flip(R.append));

// [2, 3]
console.log(transduceArray(transducer, stepper, [], [1, 2]));
