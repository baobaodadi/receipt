import { spawn } from 'redux-saga/effects';
import list from './list';
import company from './company';

export default function* () {
  yield [
    spawn(list),
    spawn(company),
  ];
}
