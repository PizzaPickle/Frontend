import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mydataURL: "",
};

const mydataURLSlice = createSlice({
    name: "mydataURL",
    initialState: initialState,
    reducers: {
        setmydataURL(state, action){
            state.mydataURL = action.payload;
            console.log(action.payload); 
        },
    }
});

export const {
    setmydataURL,
} = mydataURLSlice.actions;

export default mydataURLSlice.reducer;
