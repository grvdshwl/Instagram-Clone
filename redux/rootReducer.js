import { combineReducers } from "redux";
import { feedReducer } from "./feed/feed.reducer";
import { usersReducer } from "./users/users.reducer";

export const rootReducer = combineReducers({
  user: usersReducer,
  feed: feedReducer,
});
