import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: "국내주식",
      label: 1,
      value: 20,
      color: "#FF6767",
      productList: [
        {
          code: "000660",
          ratio: 50,
          themeName: "반도체",
          name: "하이닉스",
        },
        {
          code: "005930",
          ratio: 50,
          themeName: "반도체",
          name: "삼성전자",
        },
      ],
      isValidProductRatio: true,
      selected: true,
    },
    {
      id: "해외주식",
      label: 2,
      value: 20,
      color: "#FFC27B",
      productList: [],
      isValidProductRatio: true,
      selected: false,
    },
    {
      id: "채권",
      label: 3,
      value: 20,
      color: "#FF8B67",
      productList: [],
      isValidProductRatio: true,
      selected: false,
    },
    {
      id: "ETF",
      label: 4,
      value: 20,
      color: "#FFADB6",
      productList: [],
      isValidProductRatio: true,
      selected: false,
    },
    {
      id: "원자재",
      label: 5,
      value: 20,
      color: "#ffd9ad",
      productList: [],
      isValidProductRatio: true,
      selected: false,
    },
  ],
  isValidCategoryRatio: true,
};

const strategySlice = createSlice({
  name: "strategy",
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.data;
    },
    updateCategoryValueById: (state, action) => {
      const { categoryId, newValue } = action.payload;
      console.log("카테고리 비율 변경!", action.payload);

      const selectedCategory = state.data.find(
        (category) => category.id === categoryId
      );
      if (selectedCategory) {
        selectedCategory.value = newValue;
      }

      //합계가 100인지 확인 로직임
      const totalValue = state.data.reduce(
        (sum, category) => sum + Number(category.value),
        0
      );
      state.isValidCategoryRatio = totalValue === 100 ? true : false;
    },
    //선택된 카테고리에 상품추가
    addProductInSelectedCategory: (state, action) => {
      const { categoryId, product } = action.payload;
      //   product 예시
      // {
      // code: "000660",
      // ratio: 56,
      // themeName: "원자재2",
      // name: "하이닉스",
      // },
      const selectedCategory = state.data.find(
        (category) => category.id === categoryId
      );
      if (selectedCategory) {
        selectedCategory.productList.push(product);
      }

      const totalProductRatio = selectedCategory.productList.reduce(
        (sum, product) => sum + product.ratio,
        0
      );
      //   console.log(totalProductRatio);
      selectedCategory.isValidProductRatio =
        totalProductRatio === 100 ? true : false;
      //   console.log(state.data.isValidCategoryRatio);
    },
    //선택된 카테고리에서 상품삭제
    removeProductInSelectedCategory: (state, action) => {
      const { categoryId, productCode } = action.payload;

      const category = state.data.find(
        (category) => category.id === categoryId
      );

      if (category) {
        // 제품 목록에서 특정 제품 제거
        category.productList = category.productList.filter(
          (product) => product.code !== productCode
        );
      }
    },
    //선택된 상품 비율 업데이트
    updateProductRatio: (state, action) => {
    //   console.log(action.payload);
      const { categoryId, productCode, ratio } = action.payload;

      const selectedCategory = state.data.find(
        (category) => category.id === categoryId
      );

      if (selectedCategory) {
        const product = selectedCategory.productList.find(
          (product) => product.code === productCode
        );

        if (product) {
          product.ratio = ratio;
        }
      }

      //유효한 비율 값인지..
      const totalProductRatio = selectedCategory.productList.reduce(
        (sum, product) => sum + product.ratio,
        0
      );
      selectedCategory.isValidProductRatio =
        totalProductRatio === 100 ? true : false;
    },
    selectCategory: (state, action) => {
      const { categoryId } = action.payload;

      state.data = state.data.map((category) => {
        return {
          ...category,
          selected: Boolean(category.id === categoryId),
        };
      });
    },
    clearData: (state) => {
      state.data = initialState;
    },
  },
});

export const {
  updateCategoryValueById,
  setData,
  addProductInSelectedCategory,
  removeProductInSelectedCategory,
  selectCategory,
  clearData,
  updateProductRatio,
} = strategySlice.actions;

export default strategySlice.reducer;
