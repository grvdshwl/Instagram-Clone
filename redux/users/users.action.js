import { usersActionTypes } from "./users.types";

export const checkUserSession = () => ({
  type: usersActionTypes.CHECK_USER_SESSION,
});

export const setCurrentUser = (user) => ({
  type: usersActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const authFailure = (error) => ({
  type: usersActionTypes.AUTH_FAILURE,
  payload: error,
});

export const logOut = () => ({
  type: usersActionTypes.LOG_OUT,
});

export const signIn = (data) => ({
  type: usersActionTypes.SIGN_IN,
  payload: data,
});

export const signUp = (data) => ({
  type: usersActionTypes.SIGN_UP,
  payload: data,
});

export const fetchUserPost = () => ({
  type: usersActionTypes.FETCH_USER_POST,
});

export const saveUserPost = (data) => ({
  type: usersActionTypes.SAVE_POST,
  payload: data,
});
