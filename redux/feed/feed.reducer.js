import { feedActionTypes } from "./feed.types";

const INITIAL_STATE = {
  feedData: null,
};

export const feedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case feedActionTypes.SAVE_FEED:
      return {
        ...state,

        feedData: action.payload,
      };
    default:
      return state;
  }
};
