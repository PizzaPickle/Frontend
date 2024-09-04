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
            console.log(action.payload); // 여기에 payload가 올바르게 전달되는지 확인
        },
    }
});

export const {
    setPb,
} = pbSlice.actions;

export default pbSlice.reducer;
