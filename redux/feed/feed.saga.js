import { all, call, takeLatest, put } from "redux-saga/effects";
import firebase, { fetchUserFeedData } from "../../firebase/index";
import { saveFeed } from "./feed.action";
import { feedActionTypes } from "./feed.types";

function* fetchFeed({ payload: feedIdData }) {
  try {
    const data = yield fetchUserFeedData(feedIdData);

    yield put(saveFeed(data));
  } catch (error) {
    console.log(error.message);
  }
}

function* onFetchFeed() {
  yield takeLatest(feedActionTypes.FETCH_FEED, fetchFeed);
}

export function* feedSagas() {
  yield all([call(onFetchFeed)]);
}
