import { feedActionTypes } from "./feed.types";

const INITIAL_STATE = {
  feedLoading: false,
  feedData: [],
};

export const feedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case feedActionTypes.FETCH_FEED:
      return {
        ...state,
        feedLoading: true,
      };
    case feedActionTypes.SAVE_FEED:
      return {
        ...state,
        feedLoading: false,
        feedData: action.payload,
      };
    default:
      return state;
  }
};
