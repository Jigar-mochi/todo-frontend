import { configureStore } from '@reduxjs/toolkit';
import authSlice from './api/auth/slice';
import notesSlice from './api/notes/slice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        notes: notesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
