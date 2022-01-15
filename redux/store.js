import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import { rootSagas } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSagas);
