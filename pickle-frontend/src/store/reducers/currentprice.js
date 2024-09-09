import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prices: {},
    loading: false,
    error: null
};

const stockPricesSlice = createSlice({
    name: 'stockPrices',
    initialState: initialState,
    reducers: {
      setPrices(state, action) {
        state.prices = action.payload;
      },
      setLoading(state, action) {
        state.loading = action.payload;
      },
      setError(state, action) {
        state.error = action.payload;
      },
    },
});

export const {
    setPrices,
    setLoading,
    setError,
  } = stockPricesSlice.actions;

export default stockPricesSlice.reducer;
