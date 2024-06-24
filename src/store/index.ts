import { configureStore, ThunkAction, Action, EnhancedStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import { Reducer } from 'redux';

const persistConfig = {
  key: 'admin',
  keyPrefix: '',
  storage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer()),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: import.meta.env.DEV,

});

const asyncReducers: any = {};

export const persistor: Persistor = persistStore(store);

export const injectReducer = (key: string, reducer: Reducer): EnhancedStore | false => {
  if (asyncReducers[key]) {
    return false;
  }
  asyncReducers[key] = reducer;
  store.replaceReducer(persistReducer(persistConfig, rootReducer(asyncReducers)));
  persistor.persist();
  return store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
