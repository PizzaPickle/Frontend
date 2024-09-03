import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedPb: null,
    selectedDate: null,
};

const pbSlice = createSlice({
    name: "pb",
    initialState: initialState,
    reducers: {
        setSelectedPb: (state, action) => {
            state.selectedPb = action.payload;
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
    }
});

export const {
    setSelectedPb,
    setSelectedDate,
} = pbSlice.actions;

export default pbSlice.reducer;
