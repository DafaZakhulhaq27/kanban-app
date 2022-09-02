import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios, errorResponse, toastError, toastSuccess } from "../../config";
import { toast } from 'react-toastify';

const TOKEN  = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0OTIsImV4cCI6MTY2MjM5MzIwNX0.kPU4n56bXKQvj7aNwNOK3QqVqnYsPzaDPGKm1GXKYNg' ;

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
        const responseItems = await axios.get(`/todos/${params.id}/items`,{
            headers: { Authorization: `Bearer ${TOKEN}` },
        });    

        return {
            index : params.index,
            response : responseItems.data
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

export const addTaskItem = createAsyncThunk("task/add", async (id,form) => {
    try {
      const response = await axios.post(`/todos/${id}/items`, form,{
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      toast('Add Task Item Success', toastSuccess)
      return response.data ;
    } catch (err) {
      toast(errorResponse(err), toastError)
      return errorResponse(err);
    }
});

