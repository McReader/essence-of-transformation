import R from 'ramda';

/**
 * @param {function} transducer
 * @param {function} stepper
 * @param {*} init
 * @param {string} input
 * @returns {*}
 */
export default function lines(transducer, stepper, init, input) {
  // TODO make own lazy implementation with
  return R.transduce(transducer, stepper, init, R.split('\n', input));
}
