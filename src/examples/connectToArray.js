import R from 'ramda';
import wrap from '../transduce/utils/wrap';

const transducer = R.map(R.add(1));
const stepper = wrap(R.flip(R.append));
const transformer = transducer(stepper);

// transducer: 1 + 1 = 2;
// stepper: [].push(2);
console.log(transformer['@@transducer/step']([], 1));

// transducer: 1 + 1 = 2;
// stepper: [1].push(2);
console.log(transformer['@@transducer/step']([1], 1));

// transducer: 2 + 1 = 3;
// stepper: [1, 2].push(2);
console.log(transformer['@@transducer/step']([1, 2], 2));
