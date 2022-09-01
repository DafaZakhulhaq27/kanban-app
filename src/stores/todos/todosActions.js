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
        const responseItems = await axios.get(`/todos/${response.data[i].id}/items`,{
            headers: { Authorization: `Bearer ${TOKEN}` },
        });    

        todos.push({
            ...response.data[i],
            items : responseItems.data
        })
      }

      return todos;
    } catch (err) {
      return errorResponse(err);
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
        toast('Add Todo Group Failed', toastError)
        return errorResponse(err);
    }
});