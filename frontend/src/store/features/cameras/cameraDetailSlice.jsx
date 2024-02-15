import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  camera: {},
  error: '',
};
export const getCameraDetail = createAsyncThunk('cameraDetail/getCameraDetail', async (id) => {
  const headers = {
    'Content-Type': 'application/json',
    Mode: 'no-cors',
  };

  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/cameras/${id}`, {
    headers,
  });

  return data;
});

const cameraDetailSlice = createSlice({
  name: 'cameraDetail',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.camera = {};
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCameraDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCameraDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.camera = action.payload;
    });
    builder.addCase(getCameraDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default cameraDetailSlice.reducer;
