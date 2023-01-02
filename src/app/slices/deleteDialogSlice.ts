import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DeleteDialogState {
    isOpen: boolean,
    id: string
}

const initialState: DeleteDialogState = {
    isOpen: false,
    id: ''
}

export const deleteDialogSlice = createSlice({
    name: 'deleteDialog',
    initialState,
    reducers: {

       openDeleteDialog: (state, action: PayloadAction<string>) => {
           state.isOpen = true;
           state.id = action.payload;
       },

       closeDeleteDialog: (state) => {
        state.isOpen = false;
        state.id = '';
       }

    },
})

// Action creators are generated for each case reducer function
export const { openDeleteDialog, closeDeleteDialog } = deleteDialogSlice.actions

export default deleteDialogSlice.reducer