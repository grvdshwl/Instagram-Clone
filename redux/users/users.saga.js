import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  auth,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase";
import { authFailure, setCurrentUser } from "./users.action";
import { usersActionTypes } from "./users.types";

function* authenticationSuccess(userAuth) {
  try {
    const userRef = yield createUserProfileDocument(userAuth);

    const userData = yield userRef.get();

    const data = {
      ...userData.data(),
      id: userData.id,
    };

    console.log(data);

    yield put(setCurrentUser(data));
  } catch (error) {
    yield put(authFailure(error.message));
  }
}

function* checkUserSession() {
  try {
    const userAuth = yield getCurrentUser();
    if (userAuth) {
      yield authenticationSuccess(userAuth);
    } else {
      yield put(setCurrentUser(null));
    }
  } catch (error) {
    yield put(authFailure(error.message));
  }
}

function* logOut() {
  try {
    auth.signOut();
    yield checkUserSession();
  } catch (error) {
    yield put(authFailure(error.message));
  }
}

function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    yield auth.signInWithEmailAndPassword(email, password);
    yield checkUserSession();
  } catch (error) {
    yield put(authFailure(error.message));
  }
}

function* signUp({ payload }) {
  try {
    const { email, password, name, confirmPassword } = payload;

    if (password !== confirmPassword) {
      throw new Error("passwords do not match");
    }

    const { user } = yield auth.createUserWithEmailAndPassword(email, password);

    if (user) {
      yield createUserProfileDocument(user, { name });
      yield checkUserSession();
    }
  } catch (error) {
    yield put(authFailure(error.message));
  }
}

function* checkUsersSessionStart() {
  yield takeLatest(usersActionTypes.CHECK_USER_SESSION, checkUserSession);
}

function* onLogOut() {
  yield takeLatest(usersActionTypes.LOG_OUT, logOut);
}

function* onSignIn() {
  yield takeLatest(usersActionTypes.SIGN_IN, signIn);
}

function* onSignUp() {
  yield takeLatest(usersActionTypes.SIGN_UP, signUp);
}

export function* userSagas() {
  yield all([
    call(checkUsersSessionStart),
    call(onLogOut),
    call(onSignIn),
    call(onSignUp),
  ]);
}
