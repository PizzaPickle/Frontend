import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: "홍길동" //TODO 변경
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            //로그인 했을 때 로직 예시
            state.id = action.payload.user.id;
            state.name = action.payload.user.name;
        },
        logoutUser: (state) => {
            //로그아웃
            state.id = null;
            state.name = "";
        },
    }
});

export const {
    setUser, logoutUser
} = userSlice.actions;

export default userSlice.reducer;