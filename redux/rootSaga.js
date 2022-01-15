import { all, call } from "redux-saga/effects";
import { userSagas } from "./users/users.saga";

export function* rootSagas() {
  yield all([call(userSagas)]);
}
