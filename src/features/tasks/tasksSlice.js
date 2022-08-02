import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
});

export default tasksSlice.reducer;
