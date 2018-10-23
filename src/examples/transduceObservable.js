import R from 'ramda'
import { of } from 'rxjs/observable/of';
import transduceObservable from '../impl/rx/transduceObservable';

const input$ = of(1, 2);

const transducer = R.map(R.add(1));

// --- 2 - 3
transduceObservable(transducer, input$).subscribe(console.log);
