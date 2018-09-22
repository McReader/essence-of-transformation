import R from 'ramda';

export const isGet = R.propEq('httpVerb', 'GET');

export const isStatic = R.pipe(
  R.view(R.lensProp('path')),
  R.complement(R.test(/\/static\//)),
);
