import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  message: '',
  error: '',
};
export const updateDetectation = createAsyncThunk('detectationUpdate/updateDetectation', async ({ values, id }) => {
  const headers = {
    'Content-Type': 'application/json',
    Mode: 'no-cors',
  };

  const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/detectations/${id}`, values, {
    headers,
  });

  return data;
});

const detectationUpdateSlice = createSlice({
  name: 'detectationUpdate',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.message = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateDetectation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDetectation.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(updateDetectation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default detectationUpdateSlice.reducer;
