import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import homeReducer from './homeReducer';
import categoryReducer from './categoryReducer';
import commonReducer from './commonReducer';
import collectionsReducer from './collectionsReducer';
import rootWatcher from './saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  homePage: homeReducer,
  categoryPage: categoryReducer,
  common: commonReducer,
  collectionsPage: collectionsReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type InferActionsTypes<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootWatcher);

export default store;
