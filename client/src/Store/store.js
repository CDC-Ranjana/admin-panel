
// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import activitiesAndNewsReducer from '../Reducers/activitiesAndNewsSlice.js';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // whitelist: ['recentActivities'], // Only persist 'recentActivities'
};

// Combine reducers (in case you add more slices later)
const rootReducer = combineReducers({
  activitiesAndNews: activitiesAndNewsReducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Create the persistor
export const persistor = persistStore(store);

