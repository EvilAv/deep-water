import { configureStore } from "@reduxjs/toolkit";
import mapControlSlice from "../features/map-control/mapControlSlice";
import mapSlice from "../features/map-generator/mapSlice";


export const store = configureStore({
    reducer: {
        mapControl: mapControlSlice,
        map: mapSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch