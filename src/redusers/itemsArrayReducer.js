import { createSlice } from "@reduxjs/toolkit";

const itemsReducer=createSlice({
    name:'itemsArray',
    initialState:{
        itemsArray:[]
    },
    reducers:{
        ADD_ITEMS:(state,action)=>{
            state.itemsArray=action.payload
        }
    }
})
export const {ADD_ITEMS}=itemsReducer.actions
export default itemsReducer.reducer