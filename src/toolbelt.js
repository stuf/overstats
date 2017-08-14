import * as O from 'osmosis';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as util from 'util';
import { lift1 } from 'karet.util';

//

export const fstU = (a, _) => a;
export const sndU = (_, b) => b;

export const fstTo = R.adjust(R.__, 0);
export const sndTo = R.adjust(R.__, 1);

export const withFst = fn => ([a, b]) => [fn(a), b];
export const withSnd = fn => ([a, b]) => [a, fn(b)];

//

export const replaceSeparator = R.replace(' - ', ' ');
export const emptyJoin = R.join('');

//

export const parse = R.curry((o, data) => o.parse(data))

export const callNextO = fn => (ctx, data, next) => next(ctx, fn(data));
export const applyO = R.curry((fn, o) => fn(o));
export const callO = R.curry((name, fn, o) => o[name](fn(o)));

export const thenO = R.curry((fn, o) => o.then(fn));
export const dataO = R.curry((fn, o) => o.data(fn));
export const logO = R.curry((fn, o) => o.log(fn));
export const errorO = R.curry((fn, o) => o.error(fn));
export const debugO = R.curry((fn, o) => o.debug(fn));
export const doneO = R.curry((fn, o) => o.done(fn));
export const findO = R.curry((sel, o) => o.find(sel));
export const setO = R.curry((ps, o) => o.set(ps));
export const setO1 = a => o => o.set(a);
export const setO2 = (a, b) => o => o.set(a, b);

export const nextU = lift1(callNextO);
export const applyU = lift1(applyO);
export const callU = lift1(callO);
export const thenU = lift1(thenO);
export const dataU = lift1(dataO);
export const findU = lift1(findO);
export const setU = lift1(setO);
export const set1U = lift1(setO1);
export const set2U = lift1(setO2);
export const parseU = lift1(parse);

export const thenDo = fn => thenO(callNextO(fn))
export const thenDoU = lift1(thenDo);

export const foldResult = o => {
  const bus = U.bus();
  const busProp =
    U.seq(bus,
          U.toProperty,
          U.foldPast((acc, x) => R.merge(acc, x), {}));

  const cb = (ctx, data, next, done) => {
    if (!data) done();
    bus.push(data);
    next(ctx, data);
  };

  const doneCb = () => bus.end();

  o.then(cb)
   .done(() => bus.end());

  return busProp;
};

//

export const seq = (v, ...fns) => R.pipe(...fns)(v);

// Strings

const firstToUpperCase = fstTo(R.toUpper);
const splitWordAtFirstChar = R.splitAt(1);

export const capitalize = R.compose(emptyJoin, firstToUpperCase, splitWordAtFirstChar, R.toLower);
export const camelCase = R.compose(emptyJoin, fstTo(R.toLower), R.map(capitalize), R.split(' '), replaceSeparator);
