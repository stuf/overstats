import * as L from 'partial.lenses';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as O from 'osmosis';
import { log } from 'util';

import * as H from './toolbelt';
import * as C from './controller';
import { Hero, Region } from './constants';
import { parseCareerStats } from './parser';

const {
  lift,
  lift1,
  flatMapLatest: chain
} = U;

//

const data =
  U.seq(C.getProfile({ region: Region.EU, name: 'piparkaq', id: '2318' }),
        lift(H.parse(O),
             H.findO('body')));

//

const result = U.atom();
const resultP = U.template(result);
const resultT = U.foldPast(R.merge, {}, resultP);

const pipeline =
  R.pipe(L.collect(L.values),
         H.withSnd(R.pipe(R.splitEvery(2),
                          R.map(H.fstTo(H.camelCase)),
                          R.fromPairs)),
         H.fstTo(H.camelCase),
         R.of,
         R.fromPairs);

U.seq(data,
      chain(R.pipe(H.findO(`.js-stats[data-category-id="${Hero.ALL}"]`),
                   H.findO('table'),
                   H.setO({
                     key: 'thead',
                     stats: ['tr > td']
                   }))),
      lift1(H.thenDo(pipeline)),
      chain(H.foldResult)).log('derp');

// process.exit(1);
