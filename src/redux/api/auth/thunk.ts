/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface UserRegisterTypes {
    fullName: string;
    userName: string;
    email: string;
    password: string;
}
interface UserLoginTypes {
    userName: string;
    password: string;
}

interface RegisterParams {
    body: UserRegisterTypes;
    callBack: (_token: string) => void
}
interface LoginParams {
    body: UserLoginTypes;
    callBack: (_token: string) => void
}

export const handleRegister = createAsyncThunk(
    'handleRegister',
    async (params: RegisterParams, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/users/register`, params.body);
            if (response.status === 201 && params.callBack) {
                params.callBack(response.data.data.accessToken);
                return;
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message as string);
        }
    }
);
export const handleLogin = createAsyncThunk(
    'handleLogin',
    async (params: LoginParams, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/users/login`, params.body);
            if (response.status === 201 && params.callBack) {
                params.callBack(response.data.data.accessToken);
                return;
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message as string);
        }
    }
);
