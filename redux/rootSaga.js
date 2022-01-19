import { all, call } from "redux-saga/effects";
import { feedSagas } from "./feed/feed.saga";
import { userSagas } from "./users/users.saga";

export function* rootSagas() {
  yield all([call(userSagas), call(feedSagas)]);
}
