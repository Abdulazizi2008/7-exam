import { createSlice } from "@reduxjs/toolkit";

const colorsSlice = createSlice({
  name: "colors",
  initialState: {
    colors: [],
    loading: false,
    error: null,
  },
  reducers: {
    saveColors: (state, action) => {
      state.colors = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { saveColors, setLoading } = colorsSlice.actions;

export default colorsSlice.reducer;
