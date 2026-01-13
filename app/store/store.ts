
import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./slices/counterSlice"



 export const store = configureStore ({
   reducer : {
        task:taskReducer,

    }
 })