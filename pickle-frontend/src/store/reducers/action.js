export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';

export const setInputValue = (value) => ({
  type: SET_INPUT_VALUE,
  payload: value,
});

export const setSelectedPb = (pb) => ({
  type: 'SET_SELECTED_PB',
  payload: pb,
});

export const setSelectedDate = (date) => ({
  type: 'SET_SELECTED_DATE',
  payload: date,
});
