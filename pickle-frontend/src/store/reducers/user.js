import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: localStorage.getItem("username") || "", // TODO 변경
  token: localStorage.getItem("accessToken") || null, // localStorage에서 토큰을 불러옴
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      // action.payload에서 데이터 추출
      const { user, token } = action.payload;

      // localStorage에 저장
      localStorage.setItem("accessToken", token);
      localStorage.setItem("username", user.name);

      // Redux 상태 업데이트
      state.id = user.id;
      state.name = user.name;
      state.token = token;
    },
    logoutUser: (state) => {
      // localStorage에서 데이터 삭제
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");

      // Redux 상태 초기화
      state.id = null;
      state.name = "";
      state.token = null; // 토큰 삭제
    },
    setToken: (state, action) => {
      // 토큰 업데이트
      state.token = action.payload.token;
    },
  },
});

export const { setUser, logoutUser, setToken } = userSlice.actions;

export default userSlice.reducer;
