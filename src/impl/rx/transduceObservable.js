import { Observable } from 'rxjs';

const wrap = observer => ({
  '@@transducer/init': () => observer,
  '@@transducer/step': (obs, value) => {
    obs.next(value);
  },
  '@@transducer/result': () => {
    observer.complete()
  },
});

const transduceObservable = (transducer, input$) => {
  return Observable.create((observer) => {
    const stepper = wrap(observer);
    const xf = transducer(stepper);

    input$
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
};

export default transduceObservable;
