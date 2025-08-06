interface Message {
  role: "user" | "model";
  text: string;
}

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../lib/axios";

// interface Message {
//   role: "user" | "model";
//   text: string;
// }

// interface Chat {
//   _id: string;
//   title: string;
//   history: Message[];
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface ChatState {
//   chats: Chat[];              // all chats (sidebar list)
//   currentChat: Chat | null;   // selected chat
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ChatState = {
//   chats: [],
//   currentChat: null,
//   loading: false,
//   error: null,
// };

// // ✅ 1. Get all chats
// export const fetchAllChats = createAsyncThunk("chat/fetchAll", async (_, thunkAPI) => {
//   try {
//     const res = await axiosInstance.get("/chats");
//     return res.data;
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(err.response.data.message);
//   }
// });

// // ✅ 2. Create or continue chat
// export const createChat = createAsyncThunk(
//   "chat/create",
//   async (data: { prompt: string; chatId?: string }, thunkAPI) => {
//     try {
//       const res = await axiosInstance.post("/chats", data);
//       return res.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response.data.message);
//     }
//   }
// );

// // ✅ 3. Get one chat
// export const getChatById = createAsyncThunk("chat/getById", async (id: string, thunkAPI) => {
//   try {
//     const res = await axiosInstance.get(`/chats/${id}`);
//     return res.data;
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(err.response.data.message);
//   }
// });

// // ✅ 4. Delete one chat
// export const deleteChat = createAsyncThunk("chat/deleteOne", async (id: string, thunkAPI) => {
//   try {
//     await axiosInstance.delete(`/chats/${id}`);
//     return id;
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(err.response.data.message);
//   }
// });

// // ✅ 5. Delete all chats
// export const deleteAllChats = createAsyncThunk("chat/deleteAll", async (_, thunkAPI) => {
//   try {
//     await axiosInstance.delete("/chats");
//     return;
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(err.response.data.message);
//   }
// });

// const chatSlice = createSlice({
//   name: "chat",
//   initialState,
//   reducers: {
//     resetCurrentChat: (state) => {
//       state.currentChat = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // fetchAll
//       .addCase(fetchAllChats.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAllChats.fulfilled, (state, action) => {
//         state.loading = false;
//         state.chats = action.payload;
//       })
//       .addCase(fetchAllChats.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // createChat
//       .addCase(createChat.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createChat.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentChat = action.payload;
//         const existingIndex = state.chats.findIndex(chat => chat._id === action.payload._id);
//         if (existingIndex !== -1) {
//           state.chats[existingIndex] = action.payload;
//         } else {
//           state.chats.unshift({
//             _id: action.payload._id,
//             title: action.payload.title,
//             history: action.payload.history,
//             createdAt: action.payload.createdAt,
//             updatedAt: action.payload.updatedAt,
//           });
//         }
//       })
//       .addCase(createChat.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // getChatById
//       .addCase(getChatById.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getChatById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentChat = action.payload;
//       })
//       .addCase(getChatById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // deleteChat
//       .addCase(deleteChat.fulfilled, (state, action) => {
//         state.chats = state.chats.filter(chat => chat._id !== action.payload);
//         if (state.currentChat?._id === action.payload) {
//           state.currentChat = null;
//         }
//       })

//       // deleteAllChats
//       .addCase(deleteAllChats.fulfilled, (state) => {
//         state.chats = [];
//         state.currentChat = null;
//       });
//   },
// });

// export const { resetCurrentChat } = chatSlice.actions;

// export default chatSlice.reducer;
