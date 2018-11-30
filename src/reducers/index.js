import { combineReducers } from 'redux';
import list from './list';
import globle from './globle';
import company from './company';

export default combineReducers({
  list,
  globle,
  company,
});
