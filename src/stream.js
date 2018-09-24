import fs from 'fs';
import split from 'split';
import R from 'ramda';

import parse from './logs/parse';
import stream from './transduce/stream';

fs
  .createReadStream('log.txt', { encoding: 'utf-8' })
  .pipe(split())
  .pipe(stream(parse))
  .pipe(stream(R.map(R.concat(R.__, '\n'))))
  .pipe(process.stdout);
