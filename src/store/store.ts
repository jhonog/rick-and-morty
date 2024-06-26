import { configureStore } from '@reduxjs/toolkit'

import charactersSlice from './slices/charactersSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import filtersSlice from './slices/filtersSlice';
import navigationSlice from './slices/navigationSlice';

export const store = configureStore({
    reducer: {
        charactersSlice,
        filtersSlice,
        navigationSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;