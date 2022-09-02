import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { addTaskItem, addTodo, fetchTaskItem, fetchTodo, moveTaskItem } from "./todosActions";

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

     // fetch task items
      builder.addCase(fetchTaskItem.fulfilled, (state, action) => {
        const index = action.payload.index ;

          state.data[index] = {
            ...state.data[index],
            items : action.payload.response,
            isLoading : false,
          }
          state.error = null;
      });
      builder.addCase(fetchTaskItem.rejected, (state, action) => {
        const index = action.payload.index ;

        state.data[index] = {
            ...state.data[index],
            isLoading : false,
        }
        state.error = action.payload.response;
      });


    // add todos
      builder.addCase(addTodo.pending, (state) => {
        state.statusAction = "loading";
      });
      builder.addCase(addTodo.fulfilled, (state, action) => {
        state.statusAction = "succeeded";
        state.data.unshift({
            ...action.payload,
            items : [],
            isLoading : false,
        }) ;
        state.error = null;
      });
      builder.addCase(addTodo.rejected, (state, action) => {
        state.statusAction = "failed";
        state.error = action.payload;
      });

        // add task
        builder.addCase(addTaskItem.pending, (state) => {
            state.statusAction = "loading";
        });
        builder.addCase(addTaskItem.fulfilled, (state, action) => {
            const index = action.payload.index ;
            const task = action.payload.response ;

            state.statusAction = "succeeded";
            state.data[index].items.unshift(task) ;
            state.error = null;
        });
        builder.addCase(addTaskItem.rejected, (state, action) => {
            state.statusAction = "failed";
            state.error = action.payload;
        });

        // move task
        builder.addCase(moveTaskItem.pending, (state) => {
            state.statusAction = "loading";
        });
        builder.addCase(moveTaskItem.fulfilled, (state, action) => {
            const index = action.payload.index ;
            const indexPrev = action.payload.indexPrev ;
            const indexNext = action.payload.indexNext ;
            const task = action.payload.response ;

            state.statusAction = "succeeded";
            state.data[indexPrev].items.splice(index,1) ;
            state.data[indexNext].items.unshift(task) ;
            state.error = null;
        });
        builder.addCase(moveTaskItem.rejected, (state, action) => {
            state.statusAction = "failed";
            state.error = action.payload;
        });

    },
  });

  export const todosData = (state) => state.todos;
  export default todosSlice.reducer;
