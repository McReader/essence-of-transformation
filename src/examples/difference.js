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
// [2]
console.log(transducer(functor));

console.log('as transducer:');
// XMap {
//   xf:
//   { '@@transducer/init': [Function: transducerInit],
//     '@@transducer/step': [Function: transducerStep],
//     '@@transducer/result': [Function: transducerResult] },
//   f: [Function]
// }
console.log(transducer(stepper));
