import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  status: null,
  error: null,
  boards: [],
};

export const fetchBoards = createAsyncThunk('board/fetchBoards', async (params) => {
  const { name } = params;

  const { data } = await axios.get('http/items/url');

  return data;
});

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
