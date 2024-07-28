import { combineReducers, Reducer, Action } from 'redux';
import base from './base';
import auth from './auth';

const rootReducer = (asyncReducers?: Record<string, Reducer>): Reducer => {
  return (state, action: Action) => {
    const combinedReducer = combineReducers({
      auth,
      base,
      ...asyncReducers,
    });
    return combinedReducer(state, action);
  };
};

export default rootReducer;
