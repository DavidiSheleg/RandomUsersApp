import { configureStore } from '@reduxjs/toolkit';
import userDialogReducer from './slices/userDialogSlice';
import usersReducer from './slices/usersSlice';
import deleteDialogReducer from './slices/deleteDialogSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    userDialog: userDialogReducer,
    deleteDialog: deleteDialogReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch