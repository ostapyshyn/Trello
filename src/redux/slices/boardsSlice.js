import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  board: {
    id: null,
    name: null,
  },
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard(state, action) {
      state.board = action.payload;
    },
    removeBoard(state) {
      state.id = null;
      state.name = null;
    },
  },
});

export const { setBoard } = boardSlice.actions;

export default boardSlice.reducer;
