import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedPb: null,
};

const pbSlice = createSlice({
    name: "selectedPb",
    initialState: initialState,
    reducers: {
        setPb(state, action){
            state.selectedPb = action.payload;
            console.log(action.payload);
        },
    }
});

export const {
    setPb,
} = pbSlice.actions;

export default pbSlice.reducer;
