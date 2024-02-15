import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  message: '',
  error: '',
};
export const deleteDetectation = createAsyncThunk('detectationDelete/deleteDetectation', async (id) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Mode: 'no-cors',
    };

    const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/detectations/${id}`, {
      headers,
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
});

const detectationDeleteSlice = createSlice({
  name: 'detectationDelete',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.message = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteDetectation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteDetectation.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteDetectation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default detectationDeleteSlice.reducer;
