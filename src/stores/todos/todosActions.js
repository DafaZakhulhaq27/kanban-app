import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios, errorResponse, toastError, toastSuccess } from "../../config";
import { toast } from 'react-toastify';

const TOKEN  = localStorage.getItem('token_kanban') ;

export const fetchTodo = createAsyncThunk("todos", async (form) => {
    try {
      const response = await axios.get("/todos",{
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      const sortedNewest = response.data.sort(
        (a, b) =>  new Date(b.updated_at) - new Date(a.updated_at)  ,
      );

      let todos = [];

      for(let i = 0 ; i < sortedNewest.length ; i++){
        todos.push({
            ...response.data[i],
            items : [],
            isLoading : true 
        })
      }

      return todos;
    } catch (err) {
      return errorResponse(err);
    }
});

export const fetchTaskItem = createAsyncThunk("todos/task", async (params) => {
    try {
        const response = await axios.get(`/todos/${params.id}/items`,{
            headers: { Authorization: `Bearer ${TOKEN}` },
        });    

        const sortedNewest = response.data.sort(
            (a, b) =>  new Date(b.updated_at) - new Date(a.updated_at)  ,
        );

        return {
            index : params.index,
            response : sortedNewest
        };
    } catch (err) {
        return {
            index : params.index,
            response : errorResponse(err)
        } ;
    }
});


export const addTodo = createAsyncThunk("todos/add", async (form) => {
    try {
        const response = await axios.post("todos", form,{
            headers: { Authorization: `Bearer ${TOKEN}` },
        });
        toast('Add Todo Group Success', toastSuccess)
        return response.data ;
    } catch (err) {
        toast(errorResponse(err), toastError)
        return errorResponse(err);
    }
});

export const addTaskItem = createAsyncThunk("task/add", async (params) => {
    try {
      const response = await axios.post(`/todos/${params.id}/items`, params.form,{
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      toast('Add Task Item Success', toastSuccess)
      return {
        index : params.index,
        response : response.data
      };      
    } catch (err) {
      toast(errorResponse(err), toastError)
      return {
        index : params.index,
        response : errorResponse(err)
      }; 
    }
});

export const moveTaskItem = createAsyncThunk("task/move", async (params) => {
    try {
      const response = await axios.patch(`/todos/${params.idGroup}/items/${params.idTask}`, params.form,{
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      toast('Move Task Item Success', toastSuccess)

      return {
        index : params.index,
        indexPrev : params.indexPrev,
        indexNext : params.indexNext,
        response : response.data
      };      
    } catch (err) {
      toast(errorResponse(err), toastError)
      return {
        index : params.index,
        response : errorResponse(err)
      }; 
    }
});

export const dragTaskItem = createAsyncThunk("task/drag", async (params) => {
  try {
    const response = await axios.patch(`/todos/${params.idGroup}/items/${params.idTask}`, params.form,{
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    toast('Move Task Item Success', toastSuccess)

    return {
      index : params.index,
      indexPrev : params.indexPrev,
      indexNext : params.indexNext,
      response : response.data
    };      
  } catch (err) {
    toast(errorResponse(err), toastError)
    return {
      index : params.index,
      indexPrev : params.indexPrev,
      indexNext : params.indexNext,
      response : errorResponse(err)
    }; 
  }
});

export const updateTaskItem = createAsyncThunk("task/update", async (params) => {
    try {
      const response = await axios.patch(`/todos/${params.idGroup}/items/${params.idTask}`, params.form,{
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      toast('Update Task Item Success', toastSuccess)

      return {
        index : params.index,
        indexGroup : params.indexGroup,
        response : response.data
      };      
    } catch (err) {
      toast(errorResponse(err), toastError)
      return {
        index : params.index,
        response : errorResponse(err)
      }; 
    }
});


export const deleteTaskItem = createAsyncThunk("task/delete", async (params) => {
    try {
      const response = await axios.delete(`/todos/${params.idGroup}/items/${params.idTask}`,{
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      toast('Delete Task Item Success', toastSuccess)

      return {
        index : params.index,
        indexGroup : params.indexGroup,
        response : response.data
      };      
    } catch (err) {
      toast(errorResponse(err), toastError)
      return {
        index : params.index,
        response : errorResponse(err)
      }; 
    }
});
