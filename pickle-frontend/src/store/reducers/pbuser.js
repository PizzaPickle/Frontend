import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "윤재욱", // TODO 변경
  token: null,
};

const userSlice = createSlice({
  name: "pbuser",
  initialState: initialState,
  reducers: {
    setPbUser: (state, action) => {
      // 로그인 했을 때 로직 예시
      state.id = action.payload.user.id;
      state.name = action.payload.user.name;
      state.token = action.payload.token; // 토큰 설정
    },
    logoutPbUser: (state) => {
      // 로그아웃
      state.id = null;
      state.name = "";
      state.token = null; // 토큰 삭제
    },
    setPbToken: (state, action) => {
      // 토큰 업데이트
      state.token = action.payload.token;
    },
  },
});

export const { setPbUser, logoutPbUser, setPbToken } = userSlice.actions;

export default userSlice.reducer;
