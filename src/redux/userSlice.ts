import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    token: string;
    secretCode: string;
    session: string
}

const userInitial: UserState = {
    token: '',
    secretCode: '',
    session: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitial,
    reducers: {
        addUserToken: (state, action: PayloadAction<{ token: string }>) => {
            const { token } = action.payload;
            state.token = token;
        },
        addUserSecretCode: (state, action: PayloadAction<{ secretCode: string }>) => {
            const { secretCode } = action.payload;
            state.secretCode = secretCode;
        },
        addUserSession: (state, action: PayloadAction<{ session: string }>) => {
            const { session } = action.payload;
            state.session = session;
        }
    }
});

export const { addUserToken, addUserSecretCode, addUserSession } = userSlice.actions;
export default userSlice.reducer;
