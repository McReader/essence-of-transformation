import fs from 'fs';

const input = fs.createReadStream('../../log.txt');

input
  .pipe(() => {})
  .pipe(() => {})
  .pipe(() => {})
  .pipe(() => {})
  .pipe(() => {});
