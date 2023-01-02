import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type UserType = {
    id: string;
    name: string;
    image: string;
    email: string;
    location: string;
}

export interface UsersState {
    data: UserType[]
}

const initialState: UsersState = {
    data: [],
}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

        setUsers: (state, action: PayloadAction<UserType[]>) => {
            state.data = action.payload;
        },

        addUser: (state, action: PayloadAction<UserType>) => {
            state.data = [...state.data, action.payload]
            return state;
        },

        removeUser: (state, action: PayloadAction<string>) => {
            const userIndex = state.data.findIndex(item => item.id === action.payload);
            if (userIndex > -1)
                state.data.splice(userIndex, 1);
        },

        updateUser: (state, action: PayloadAction<UserType>) => {
            const userIndex = state.data.findIndex(item => item.id === action.payload.id);
            if (userIndex > -1)
                state.data[userIndex] = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUsers, addUser, removeUser, updateUser } = UsersSlice.actions

export default UsersSlice.reducer