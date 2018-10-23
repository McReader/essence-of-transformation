import R from 'ramda';
import wrap from '../utils/wrap';

const stepper = wrap(R.sum);
const transducer = R.map(R.add(1));
const transformer = transducer(stepper);

// transducer: 1 + 1 = 2;
// stepper: 1 + 2 = 3;
console.log(transformer['@@transducer/step'](1, 1));

// transducer: 1 + 1 = 2;
// stepper: 2 + 2 = 4;
console.log(transformer['@@transducer/step'](2, 1));
