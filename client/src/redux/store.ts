import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './slices/themeSlice'
import  authSlice  from './slices/authSlice'
import layoutSlice from './slices/layoutSlice'
import toastSlice from './slices/toastSlice'
import userSlice from './slices/userSlice'
// ...

export const store = configureStore({
  reducer: {
  themeState:themeSlice,
  authState:authSlice,
  layoutState:layoutSlice,
  notficationState:toastSlice,
  usersState:userSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch