import { combineReducers } from 'redux';
import globle from './globle';
import back from './back';
import list from './list';
import add from './add';
import edit from './edit';
import sort from './sort';
import position from './position';
import suit from './suit';
import all from './all';
import newSuit from './new';
import modify from './modify';
import deleteSuit from './delete';
import log from './log';
import recommend from './recommend';
import del from './del';
import user from './user';


export default combineReducers({
  globle,
  back,
  list,
  add,
  edit,
  position,
  suit,
  all,
  newSuit,
  modify,
  deleteSuit,
  log,
  sort,
  del,
  user,
  recommend
});
