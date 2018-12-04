import { combineReducers } from 'redux';
import list from './list';
import globle from './globle';
import company from './company';
import status from './status';
import receive from './receive';
import account from './account';
import confirm from './confirm';

export default combineReducers({
  list,
  globle,
  company,
  status,
  receive,
  account,
  confirm,
});
