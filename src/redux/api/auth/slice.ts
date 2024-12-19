/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleLogin, handleRegister } from './thunk';
import { toast } from 'react-toastify';

interface AuthInitialState {
    error: string;
    loading: boolean;
}

const initialState: AuthInitialState = {
    error: '',
    loading: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleRegister.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleRegister.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                localStorage.setItem('accessToken', action.payload.data.authToken);
            })
            .addCase(handleRegister.rejected, (state, action) => {
                state.loading = false;
                toast.error(JSON.stringify(action.payload) || 'Something went wrong');
            })
            .addCase(handleLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleLogin.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                localStorage.setItem('accessToken', action.payload.data.authToken);
            })
            .addCase(handleLogin.rejected, (state, action) => {
                state.loading = false;
                toast.error(JSON.stringify(action.payload) || 'Something went wrong', {});
            });
    },
});

// export const { } = authSlice.actions;
export default authSlice.reducer;
