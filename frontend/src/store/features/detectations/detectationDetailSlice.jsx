import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  detectation: {},
  error: '',
};
export const getDetectationDetail = createAsyncThunk('detectationDetail/getDetectationDetail', async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    Mode: 'no-cors',
  };

  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/detectations/${id}`, {
    headers,
  });

  return data;
});

const detectationDetailSlice = createSlice({
  name: 'detectationDetail',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.detectation = {};
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDetectationDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDetectationDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.detectation = action.payload;
    });
    builder.addCase(getDetectationDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default detectationDetailSlice.reducer;
