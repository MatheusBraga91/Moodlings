import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cardThemeReducer from './cardThemeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cardTheme: cardThemeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
