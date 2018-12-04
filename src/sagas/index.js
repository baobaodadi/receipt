import { spawn } from 'redux-saga/effects';
import list from './list';
import company from './company';
import status from './status';
import receive from './receive';
import account from './account';
import confirm from './confirm';
import record from './record';

export default function* () {
  yield [
    spawn(list),
    spawn(company),
    spawn(status),
    spawn(receive),
    spawn(account),
    spawn(confirm),
    spawn(record),
  ];
}
