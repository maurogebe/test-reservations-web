import { combineReducers, Reducer, Action } from 'redux';
import base from './base';

const rootReducer = (asyncReducers?: Record<string, Reducer>): Reducer => {
  return (state, action: Action) => {
    const combinedReducer = combineReducers({
      base,
      ...asyncReducers,
    });
    return combinedReducer(state, action);
  };
};

export default rootReducer;
