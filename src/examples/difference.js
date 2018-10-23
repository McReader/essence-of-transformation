import R from 'ramda';

const functor = [1];
const stepper = {
  '@@transducer/init': () => {},
  '@@transducer/step': (result, item) => {
    return item;
  },
  '@@transducer/result': () => {},
};

const transducer = R.map(a => a + 1);

console.log('as usual operator:');
console.log(transducer(functor));

console.log('as transducer:');
console.log(transducer(stepper));
