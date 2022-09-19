import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: null,
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLists(state, action) {
      state.lists = action.payload;
    },
  },
});

export const { setLists } = listsSlice.actions;

export const listsState = (state) => state.listsSlice.lists;

export default listsSlice.reducer;
