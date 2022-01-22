import { usersActionTypes } from "../users/users.types";
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
    case usersActionTypes.LOG_OUT:
      return {
        ...state,
        feedData: null,
        feedUsers: [],
      };

    default:
      return state;
  }
};
