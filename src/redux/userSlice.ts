import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    token: string;
}

const userInitial: UserState = {
    token: '',
};

export const userSlice = createSlice({
    name: 'userToken',
    initialState: userInitial,
    reducers: {
        addUserToken: (state, action: PayloadAction<{ token: string }>) => {
            const { token } = action.payload;
            state.token = token;
        }
    }
});

export const { addUserToken } = userSlice.actions;
export default userSlice.reducer;
