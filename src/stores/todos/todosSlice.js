import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { fetchTodo } from "./todosActions";

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(fetchTodo.pending, (state) => {
        state.status = "loading";
      });
      builder.addCase(fetchTodo.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.data = action.payload;
          state.error = null;
      });
      builder.addCase(fetchTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    },
  });

  export const todosData = (state) => state.todos;
  export default todosSlice.reducer;
