/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

const API_URL = import.meta.env.VITE_API_URL;

interface AddNoteParams {
    body: {
        title: string;
        description: string;
    };
    callBack: () => void;
}

export const handleAddNote = createAsyncThunk(
    'handleAddNote',
    async (params: AddNoteParams, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${API_URL}/notes`, params.body);
            if (response.status === 201 && params.callBack) {
                params.callBack();
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message as string);
        }
    }
);
export const handleFetchNotes = createAsyncThunk(
    'handleFetchNotes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${API_URL}/notes`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message as string);
        }
    }
);