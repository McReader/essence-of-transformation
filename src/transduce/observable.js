import { Observable } from 'rxjs/Observable'

/**
 * @param {Observer} observer
 * @returns {{"@@transducer/init": function, "@@transducer/step": (function(Observer, *=)), "@@transducer/result": function}}
 */
function wrap(observer) {
  return {
    '@@transducer/init': () => observer,
    '@@transducer/step': (obs, input) => {
      obs.next(input)
    },
    '@@transducer/result': () => {
      observer.complete()
    },
  };
}

/**
 * @param {function} transducer
 * @param {Observable} init
 * @return {Observable}
 */
export default function observable(transducer, init) {
  return Observable.create((observer) => {
    const xf = transducer(wrap(observer));

    init
      .subscribe(
        (value) => {
          xf['@@transducer/step'](observer, value);
        },
        observer.error,
        () => {
          xf['@@transducer/result']();
        },
      );
  });
}
