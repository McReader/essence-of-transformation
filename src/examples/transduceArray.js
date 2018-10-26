import R from 'ramda';
import transduceArray from '../transduce/array/transduceArray';

const transducer = R.map(R.add(1));
const stepper = R.flip(R.append);

// [2, 3]
console.log(transduceArray(transducer, stepper, [], [1, 2]));
