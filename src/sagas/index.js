import { spawn } from 'redux-saga/effects';

import back from './back';
import list from './list';
import add from './add';
import edit from './edit';
import sort from './sort';
import position from './position';
import suit from './suit';
import all from './all';
import newSuit from './new';
import deleteSuit from './delete';
import modify from './modify';
import log from './log';
import recommend from './recommend';
import del from './del';
import user from './user';


export default function* () {
  yield [
    spawn(back),
    spawn(list),
    spawn(add),
    spawn(edit),
    spawn(sort),
    spawn(position),
    spawn(suit),
    spawn(all),
    spawn(newSuit),
    spawn(deleteSuit),
    spawn(modify),
    spawn(log),
    spawn(recommend),
    spawn(del),
    spawn(user),
  ];
}
