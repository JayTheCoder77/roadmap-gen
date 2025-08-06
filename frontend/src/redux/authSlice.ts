import axiosInstance from "../lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
}

interface AuthSlice {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthSlice = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/login", credentials);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.post("/register", userData);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axiosInstance.post("/logout");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
