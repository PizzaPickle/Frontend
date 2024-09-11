import {
  setPrices,
  setLoading,
  setError,
} from "../../store/reducers/currentprice"; // Adjust the import path as needed

export const fetchStockPrices = (productList) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    console.log(productList);
    const requests = productList.map((product) => {
      let apiUrl;
      let requestCode = product.code;

      switch (product.categoryName) {
        case "국내":
          apiUrl = "/currentprice/stock/current-price";
          break;
        case "해외":
          apiUrl = "/currentprice/overseas-stock/current-price";
          // requestCode = `R${product.code}`;
          break;
        case "채권":
          apiUrl = "/currentprice/bond/current-price";
          break;
        case "ETF":
          apiUrl = "/currentprice/ETF/current-price";
          break;
        case "원자재":
          apiUrl = "/currentprice/ETF/current-price";
          break;
        default:
          apiUrl = "/currentprice/stock/current-price";
          break;
      }

      return fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockId: requestCode }),
      })
        .then((response) => response.json())
        .then((data) => ({ code: product.code, price: data }));
    });

    const prices = await Promise.all(requests);
    const pricesMap = prices.reduce((acc, { code, price }) => {
      acc[code] = price;
      console.log(acc);
      return acc;
    }, {});

    dispatch(setPrices(pricesMap));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
