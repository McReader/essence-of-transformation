import R from 'ramda';

export const extractParts = R.match(/.+"(\w+) (.+) (.+)" (\d{3})/);
export const isGet = R.pipe(R.nth(1), R.equals('GET'));
export const isNonStatic = R.pipe(R.nth(2), R.complement(R.test(/\/static\//)));
export const appendHost = R.append('https://example.com');
export const toString = logParts => `${R.nth(3, logParts)} visited ${R.last(logParts)}${R.nth(2, logParts)}`;

const parse = R.compose(
  R.map(extractParts),
  R.filter(isGet),
  R.filter(isNonStatic),
  R.map(appendHost),
  R.map(toString),
);

export default parse;
