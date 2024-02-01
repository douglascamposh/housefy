"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const computeSlice = createSlice({
  name: 'compute',
  initialState,
  reducers: {
    getTable: (state, action) => {
      state.data = [...action.payload];
    },
  },
});

export const { getTable } = computeSlice.actions;
export default computeSlice.reducer;
