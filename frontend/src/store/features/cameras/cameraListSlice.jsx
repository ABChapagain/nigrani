import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  cameras: [],
  error: '',
};
export const getCameraList = createAsyncThunk('cameraList/getCameraList', async () => {
  const headers = {
    'Content-Type': 'application/json',
    Mode: 'no-cors',
  };

  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/cameras`, { headers });

  return data;
});

const cameraListSlice = createSlice({
  name: 'cameraList',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCameraList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCameraList.fulfilled, (state, action) => {
      state.loading = false;
      state.cameras = action.payload;
    });
    builder.addCase(getCameraList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default cameraListSlice.reducer;
