/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { handleAddNote, handleDeleteNote, handleFetchNotes } from './thunk';

interface NotesInitialState {
    error: string;
    loading: boolean;
    notesListing: any[] | null;
}

const initialState: NotesInitialState = {
    error: '',
    loading: false,
    notesListing: null
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleAddNote.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleAddNote.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(handleAddNote.rejected, (state, action) => {
                state.loading = false;
                toast.error(JSON.stringify(action.payload) || 'Something went wrong');
            })
            .addCase(handleFetchNotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleFetchNotes.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.notesListing = action.payload.data;
            })
            .addCase(handleFetchNotes.rejected, (state, action) => {
                state.loading = false;
                toast.error(JSON.stringify(action.payload) || 'Something went wrong');
            })
            .addCase(handleDeleteNote.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleDeleteNote.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(handleDeleteNote.rejected, (state, action) => {
                state.loading = false;
                toast.error(JSON.stringify(action.payload) || 'Something went wrong');
            });
    },
});

// export const { } = notesSlice.actions;
export default notesSlice.reducer;
