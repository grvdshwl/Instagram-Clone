import { feedActionTypes } from "./feed.types";

export const fetchFeed = (data) => ({
  type: feedActionTypes.FETCH_FEED,
  payload: data,
});

export const saveFeed = (feedData) => ({
  type: feedActionTypes.SAVE_FEED,
  payload: feedData,
});
