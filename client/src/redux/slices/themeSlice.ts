import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: 'light'
};

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    manageTheme: (state:any, action: PayloadAction<string>) => {
      state.themeMode = action.payload;
    }
  }
});

export const { manageTheme } = themeSlice.actions;
export default themeSlice.reducer;
