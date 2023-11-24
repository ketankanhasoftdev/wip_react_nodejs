import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userDetails: Record<string, any>; // Adjust the type based on your user details structure
}

const initialState: AuthState = {
  userDetails: {},
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    userReducer: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
  },
});

export const { userReducer } = authSlice.actions;
export default authSlice.reducer;
