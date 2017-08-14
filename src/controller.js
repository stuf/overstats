import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { constant } from 'kefir';

import data from './mock';

//

const getProfileUrl = ({ region, name, id }) =>
  `https://playoverwatch.com/en-us/career/pc/${region}/${name}-${id}`;

//

export const getProfile = ({ region, name, id }) =>
  U.toProperty(constant(data));
