import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { addTaskItem, addTodo, deleteTaskItem, dragTaskItem, fetchTaskItem, fetchTodo, moveTaskItem, updateTaskItem } from "./todosActions";

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
      draggedTask: (state,action) => {
        const index = action.payload.index ;
        const indexPrev = action.payload.indexPrev ;
        const indexNext = action.payload.indexNext ;
        const task = action.payload.task ;

        state.statusAction = "succeeded";
        state.data[indexPrev].items.splice(index,1) ;
        state.data[indexNext].items.unshift(task) ;
        state.error = null;      
      },
    },
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

        // drag task
        builder.addCase(dragTaskItem.pending, (state) => {
          state.statusAction = "loading";
        });
        builder.addCase(dragTaskItem.fulfilled, (state, action) => {
            const indexNext = action.payload.indexNext ;
            const task = action.payload.response ;

            state.statusAction = "succeeded";
            state.data[indexNext].items[0] = task ;
            state.error = null;
        });
        builder.addCase(dragTaskItem.rejected, (state, action) => {
            const index = action.payload.index ;
            const indexPrev = action.payload.indexPrev ;
            const indexNext = action.payload.indexNext ;
            const task = action.payload.response ;

            state.data[indexPrev].items[index] = task ;
            state.data[indexNext].items.splice(0,1) ;
            state.statusAction = "failed";
            state.error = action.payload;
        });

        // update task
        builder.addCase(updateTaskItem.pending, (state) => {
            state.statusAction = "loading";
        });
        builder.addCase(updateTaskItem.fulfilled, (state, action) => {
            const index = action.payload.index ;
            const indexGroup = action.payload.indexGroup ;
            const task = action.payload.response ;
            

            state.statusAction = "succeeded";
            state.data[indexGroup].items[index] = task ;
            state.error = null;
        });
        builder.addCase(updateTaskItem.rejected, (state, action) => {
            state.statusAction = "failed";
            state.error = action.payload;
        });

        // delete task
        builder.addCase(deleteTaskItem.pending, (state) => {
            state.statusAction = "loading";
        });
        builder.addCase(deleteTaskItem.fulfilled, (state, action) => {
            const index = action.payload.index ;
            const indexGroup = action.payload.indexGroup ;

            state.statusAction = "succeeded";
            state.data[indexGroup].items.splice(index,1) ;
            state.error = null;
        });
        builder.addCase(deleteTaskItem.rejected, (state, action) => {
            state.statusAction = "failed";
            state.error = action.payload;
        });

    },
  });

  export const todosData = (state) => state.todos;
  export const { draggedTask } = todosSlice.actions;
  export default todosSlice.reducer;
