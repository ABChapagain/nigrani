import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  detectations: [],
  error: '',
};
export const getDetectationList = createAsyncThunk('detectationList/getDetectationList', async () => {
  const headers = {
    'Content-Type': 'application/json',
    Mode: 'no-cors',
  };

  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/detectations`, { headers });

  return data;
});

const detectationListSlice = createSlice({
  name: 'detectationList',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDetectationList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDetectationList.fulfilled, (state, action) => {
      state.loading = false;
      state.detectations = action.payload;
    });
    builder.addCase(getDetectationList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default detectationListSlice.reducer;
