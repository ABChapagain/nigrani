import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import themeConfigSlice from './themeConfigSlice';

import cameraListSlice from './features/cameras/cameraListSlice';
import cameraAddSlice from './features/cameras/cameraAddSlice';
import cameraDetailSlice from './features/cameras/cameraDetailSlice';
import cameraUpdateSlice from './features/cameras/cameraUpdateSlice';
import cameraDeleteSlice from './features/cameras/cameraDeleteSlice';
import detectationListSlice from './features/detectations/detectationListSlice';
import detectationDeleteSlice from './features/detectations/detectationDeleteSlice';
import detectationDetailSlice from './features/detectations/detectationDetailSlice';
import detectationUpdateSlice from './features/detectations/detectationUpdateSlice';

const persistConfig = {
  key: 'Nigrani',
  version: 1.1,
  storage,
  blacklist: ['cameraList', 'cameraAdd', 'cameraDetail', 'cameraUpdate', 'cameraDelete', 'themeConfig'],
};

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  // Cameras
  cameraList: cameraListSlice,
  cameraAdd: cameraAddSlice,
  cameraDetail: cameraDetailSlice,
  cameraUpdate: cameraUpdateSlice,
  cameraDelete: cameraDeleteSlice,

  // Detectations
  detectationList: detectationListSlice,
  detectationDelete: detectationDeleteSlice,
  detectationDetail: detectationDetailSlice,
  detectationUpdate: detectationUpdateSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
