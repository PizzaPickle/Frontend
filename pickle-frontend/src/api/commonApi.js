import axios from "axios";
import { defaultInstance } from "./axiosInstance";

export const searchProduct = async (name, category, theme) => {
  try {
    const response = await axios.get(`/api/pickle-common/search`, {
      params: {
        name: name,
        category: category,
        theme: theme,
      },
    });
    return response.data;
  } catch (error) {
    console.log("검색 실패", error);
  }
};

export const readThemeList = async () => {
  try {
    const response = await axios.get(`/api/pickle-common/search/theme`);
    return response.data;
  } catch (error) {
    console.log("테마 불러오기 실패", error);
  }
};

export const createStrategy = async (
  pbId,
  cusId,
  consultingHistoryId,
  name,
  categoryList
) => {
  try {
    const response = await axios.post(`/api/pickle-common/strategy`, {
      pbId: pbId,
      customerId: cusId,
      consultingHistoryId: consultingHistoryId,
      name: name,
      categoryList: categoryList,
    });
    return response.data;
  } catch (error) {
    alert("전략 생성에 실패하였습니다.");
    console.log("전략 생성 실패", error);
  }
};
