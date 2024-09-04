import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedDate: null,
};

const dateSlice = createSlice({
    name: "selectedDate",
    initialState: initialState,
    reducers: {
        setDate(state, action){
            state.selectedDate = action.payload;
            console.log(action.payload); // 여기에 payload가 올바르게 전달되는지 확인
        },
    }
});

export const {
    setDate,
} = dateSlice.actions;

export default dateSlice.reducer;
