import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  message: '',
  error: '',
};
export const updateCamera = createAsyncThunk('cameraUpdate/updateCamera', async ({ values, id }) => {
  const headers = {
    'Content-Type': 'application/json',
    Mode: 'no-cors',
  };

  const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/cameras/${id}`, values, {
    headers,
  });

  return data;
});

const cameraUpdateSlice = createSlice({
  name: 'cameraUpdate',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.message = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCamera.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCamera.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(updateCamera.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default cameraUpdateSlice.reducer;
