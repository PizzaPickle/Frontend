import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "윤재욱", // TODO 변경
  token: null,
};

const pbuserSlice = createSlice({
  name: "pbuser",
  initialState: initialState,
  reducers: {
    setPbUser: (state, action) => {
      const { user, token } = action.payload;
      localStorage.setItem("accessToken", token);
      // 로그인 했을 때 로직 예시
      state.id = user.id;
      state.name = user.name;
      state.token = token; // 토큰 설정
    },
    logoutPbUser: (state) => {
      // localStorage에서 데이터 삭제
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");

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

export const { setPbUser, logoutPbUser, setPbToken } = pbuserSlice.actions;

export default pbuserSlice.reducer;
