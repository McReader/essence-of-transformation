import R from 'ramda';

const transducer = R.map(R.add(1));
const stepper = {
  '@@transducer/init': () => {
  },
  '@@transducer/step': (result, item) => {
    return item;
  },
  '@@transducer/result': () => {
  },
};
const transformer = transducer(stepper);

// transducer: 2 + 1 = 3
// stepper: 3
console.log(transformer['@@transducer/step'](null, 2));

// transducer: 3 + 1 = 4
// stepper: 4
console.log(transformer['@@transducer/step'](null, 3));

// transducer: 4 + 1 = 5
// stepper: 5
console.log(transformer['@@transducer/step'](null, 4));
