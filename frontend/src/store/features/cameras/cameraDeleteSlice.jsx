import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  message: '',
  error: '',
};
export const deleteCamera = createAsyncThunk('cameraDelete/deleteCamera', async (id) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Mode: 'no-cors',
    };

    const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/cameras/${id}`, {
      headers,
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
});

const cameraDeleteSlice = createSlice({
  name: 'cameraDelete',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.message = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCamera.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCamera.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteCamera.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default cameraDeleteSlice.reducer;
