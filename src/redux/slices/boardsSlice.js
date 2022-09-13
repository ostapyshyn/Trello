import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';

import { STATUSES } from '../data';
import { db } from '../../lib/init-firebase';

const initialState = {
  status: null,
  error: null,
  boards: [],
};

export const fetchBoards = createAsyncThunk('board/fetchBoards', async (_, { rejectWithValue }) => {
  try {
    const docsSnap = await getDocs(collection(db, 'boards'));
    return docsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    return rejectWithValue(STATUSES.failed);
  }
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
  extraReducers: {
    [fetchBoards.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
      state.boards = [];
    },
    [fetchBoards.fulfilled]: (state, action) => {
      state.boards = action.payload;
      state.status = 'success';
    },
    [fetchBoards.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'error';
      state.boards = [];
    },
  },
});

export const { setBoard, removeBoard } = boardSlice.actions;

export default boardSlice.reducer;
