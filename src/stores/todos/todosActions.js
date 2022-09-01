import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios, errorResponse } from "../../helpers";

const TOKEN  = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjIyNjY2ODV9.3pLIL45YDmhp1hCG1rbAO1ZeOGhm_V_hojmrKMto7Yo' ;

export const fetchTodo = createAsyncThunk("todos", async (form) => {
    try {
      const response = await axios.get("/todos",{
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      let todos = []

      for(let i = 0 ; i < response.data.length ; i++){
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