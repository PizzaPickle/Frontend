import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: "홍길동", // TODO 변경
    token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOCIsImlhdCI6MTcyNTgwOTk1MiwiZXhwIjoxNzI1ODExNzUyfQ.WaYcFZ4OR6RPpZaQiq0NHzHOLl1VxsGi3Vr0C1sc-wA", 
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            // 로그인 했을 때 로직 예시
            state.id = action.payload.user.id;
            state.name = action.payload.user.name;
            state.token = action.payload.token; // 토큰 설정
        },
        logoutUser: (state) => {
            // 로그아웃
            state.id = null;
            state.name = "";
            state.token = null; // 토큰 삭제
        },
        setToken: (state, action) => {
            // 토큰 업데이트
            state.token = action.payload.token;
        },
    }
});

export const {
    setUser,
    logoutUser,
    setToken, 
} = userSlice.actions;

export default userSlice.reducer;
