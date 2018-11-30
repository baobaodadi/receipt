import { spawn } from 'redux-saga/effects';
import list from './list';
import company from './company';
import status from './status';

export default function* () {
  yield [
    spawn(list),
    spawn(company),
    spawn(status),
  ];
}
