import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  message: '',
  error: '',
};
export const addNewCamera = createAsyncThunk('cameraAdd/addNewCamera', async (values) => {
  const headers = {
    'Content-Type': 'application/json',
    Mode: 'no-cors',
  };

  const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/cameras`, values, {
    headers,
  });

  return data;
});

const cameraAddSlice = createSlice({
  name: 'cameraAdd',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.message = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewCamera.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewCamera.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(addNewCamera.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default cameraAddSlice.reducer;
