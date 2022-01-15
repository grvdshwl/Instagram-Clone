import { usersActionTypes } from "./users.types";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  errorMessage: null,
  authLoading: false,
};

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case usersActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
        errorMessage: null,
        authLoading: false,
      };
    case usersActionTypes.CHECK_USER_SESSION:
    case usersActionTypes.LOG_OUT:
      return {
        ...state,
        isLoading: true,
      };
    case usersActionTypes.SIGN_IN:
    case usersActionTypes.SIGN_UP:
      return {
        ...state,
        authLoading: true,
        errorMessage: null,
      };

    case usersActionTypes.AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
