import { combineReducers, Reducer, Action } from 'redux';
import base from './base';
import auth from './auth';
import theme from './theme';

const rootReducer = (asyncReducers?: Record<string, Reducer>): Reducer => {
  return (state, action: Action) => {
    const combinedReducer = combineReducers({
      auth,
      base,
      theme,
      ...asyncReducers,
    });
    return combinedReducer(state, action);
  };
};

export default rootReducer;
