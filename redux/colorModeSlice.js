import { createSlice } from "@reduxjs/toolkit";

export const colorModeSlice = createSlice({
  name: "darkMode",
  initialState: { value: null },
  reducers: {
    invert: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { invert } = colorModeSlice.actions;

export default colorModeSlice.reducer;
