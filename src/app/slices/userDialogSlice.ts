import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserType } from './usersSlice';


export interface UserDialogState {
    isOpen: boolean,
    user: UserType | null
}

const initialState: UserDialogState = {
    isOpen: false,
    user: null
}

export const userDialogSlice = createSlice({
    name: 'userDialog',
    initialState,
    reducers: {

       openUserDialog: (state, action: PayloadAction<UserType | null>) => {
           state.isOpen = true;
           state.user = action.payload;
       },

       closeUserDialog: (state) => {
        state.isOpen = false;
        state.user = null;
       }

    },
})

// Action creators are generated for each case reducer function
export const { openUserDialog, closeUserDialog } = userDialogSlice.actions

export default userDialogSlice.reducer