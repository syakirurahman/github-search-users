import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appLayout from '../layouts/app-layout/app-layout.store'
import search from '../pages/search/search.store'
import user from '../pages/user/user.store'
import favourite from '../pages/favourite/favourite.store';

export const store = configureStore({
  reducer: {
    appLayout,
    search,
    user,
    favourite
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
