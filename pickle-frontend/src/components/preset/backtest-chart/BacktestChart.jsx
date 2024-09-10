import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { StyledColorLegend, StyledGraphDiv } from "./Backtest.style";
import RunBacktestButton from "./RunBacktestButton";
import {
  DropDownContainer,
  RadioContainer,
  RadioInput,
  RadioLabel,
  SearchContainer,
  SearchText,
} from "../../consult/search-modal/search-modal.style";
import { useSelector } from "react-redux";
import { backtest, integratedBacktest } from "../../../api/PBApi";

const BacktestChart = (props) => {
  console.log(props);
  const categoryList = useSelector((state) => state.preset.data);
  const [activeCategoryFitler, setActiveCategoryFitler] = useState(false);

  const handleCategoryChange = (e) => {
    setActiveCategoryFitler(false);

    const curCategory = categoryList.filter((category) => {
      return category.id === e.target.value;
    });

    if (curCategory[0].isValidProductRatio) {
      //요청 데이터 정체
      const request_stock_list = [];
      curCategory[0].productList.map((product) => {
        request_stock_list.push([
          `${product.code}`,
          `${product.name}`,
          Number(product.ratio) / 100,
          curCategory == "해외주식" ? "true" : "false",
        ]);
      });

      handleBacktest(request_stock_list);
    } else {
      alert("상품 비율 합이 100%이여야 합니다.");
    }
  };

  const handleIntegratedBacktest = async () => {
    if (Number(props.balance()) < 1000000) {
      alert("백테스트할 금액이 1,000,000 이상이어야 합니다");
      return;
    }

    const validCategoryList = categoryList.filter(
      (category) => category.isValidProductRatio
    );

    const assetGroups = [];

    // 비동기 처리를 모두 모아서 기다리도록 Promise.all 사용
    const fetchPromises = validCategoryList.map(async (curCategory) => {
      const request_stock_list = curCategory.productList.map((product) => [
        `${product.code}`,
        `${product.name}`,
        Number(product.ratio) / 100,
        curCategory.id === "해외주식" ? "true" : "false", // 문자열 비교로 수정
      ]);

      const portData = {
        start_from_latest_stock: "false",
        portfolio: {
          stock_list: request_stock_list,
          balance: Number(props.balance),
          interval_month: 1,
          start_date: "20100101",
          end_date: "20221231",
        },
      };

      // 백테스트 결과를 기다린 후 assetGroups에 추가
      const response = await backtest(portData).then((res) => {
        return {
          backtest: res.portfolio.backtest,
          sharpe_ratio: res.sharpe_ratio,
          standard_deviation: res.standard_deviation,
          annual_return: res.annual_return,
          total_balance: res.total_balance,
          mdd: res.mdd,
        };
      });

      assetGroups.push({
        name: curCategory.id,
        ratio: Number(curCategory.value) / 100,
        portfolio_result: response,
      });
    });

    // 모든 백테스트가 완료될 때까지 기다림
    await Promise.all(fetchPromises);

    // 모든 백테스트 완료 후 integratedBacktest 실행
    const integratedData = {
      asset_groups: assetGroups,
    };

    const response = await integratedBacktest(integratedData);
    setIntegratedResult(response);

    // console.log(response);f
  };

  //불러온 백테스팅 JSON 데이터를 정제
  const transformData = (data) => {
    return Object.entries(data).map(([stockName, series]) => ({
      stockName: stockName,
      series: Object.entries(series).map(([time, value]) => ({
        time: time,
        value: value,
      })),
    }));
  };

  const chartContainerRef = useRef(null);
  const integratedChartContainerRef = useRef(null);
  const [backtestResult, setBacktestResult] = useState(null);
  const [error, setError] = useState(null);
  const [legend, setLegend] = useState("");
  const colors = ["#FF6767", "#FF906E", "rgba(195, 195, 200, 1)"];
  const [integratedBacktestResult, setIntegratedResult] = useState(null);

  const handleBacktest = async (request_stock_list) => {
    const url = "/backtest";

    if (Number(props.balance) < 100000) {
      alert("백테스트할 금액이 100,000 이상이어야 합니다");
      return;
    }

    //요청할 포트폴리오 데이터 형식
    const portData = {
      start_from_latest_stock: "false",
      portfolio: {
        stock_list: request_stock_list,
        balance: Number(props.balance),
        interval_month: 1,
        start_date: "20100101",
        end_date: "20221231",
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backtest result:", data);
      setBacktestResult(data);
      setError(null);
    } catch (error) {
      console.error("Error during backtest:", error);
      setError(error.message);
      setBacktestResult(null);
    }
  };

  useEffect(() => {
    if (backtestResult?.portfolio?.backtest) {
      const chartOptions = {
        layout: {
          textColor: "black",
          background: { type: "solid", color: "white" },
        },
      };

      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });

      chart.applyOptions({
        rightPriceScale: {
          scaleMargins: {
            top: 0.4, // leave some space for the legend
            bottom: 0.15,
          },
        },
        crosshair: {
          horzLine: {
            visible: true,
            labelVisible: true,
          },
        },
        grid: {
          vertLines: {
            visible: true,
          },
          horzLines: {
            visible: true,
          },
        },
      });

      //Line Series 세팅
      const lineSeriesOne = chart.addLineSeries({ color: colors[0] });
      const lineSeriesTwo = chart.addLineSeries({ color: colors[1] });
      //Area Series 세팅
      const areaSeries = chart.addAreaSeries({
        topColor: "rgba(195, 195, 200, 0.56)",
        bottomColor: "rgba(195, 195, 200, 0.05)",
        lineColor: colors[2],
      });

      const transformedData = transformData(backtestResult.portfolio);

      lineSeriesOne.setData(transformedData[0].series);
      lineSeriesTwo.setData(transformedData[1].series);
      areaSeries.setData(transformedData[2].series);

      // 반응형 범례 생성
      const legendDiv = document.createElement("div");
      legendDiv.style.position = "absolute";
      legendDiv.style.left = "12px";
      legendDiv.style.top = "12px";
      legendDiv.style.zIndex = 1;
      legendDiv.style.fontSize = "14px";
      legendDiv.style.fontFamily = "sans-serif";
      legendDiv.style.lineHeight = "18px";
      legendDiv.style.fontWeight = "300";
      legendDiv.style.color = "black";
      chartContainerRef.current.appendChild(legendDiv);

      const symbolName = "평균 수익률";

      const getLastBar = (series) => {
        const lastIndex = series.dataByIndex(Number.MAX_SAFE_INTEGER, -1);
        return series.dataByIndex(lastIndex);
      };

      const formatPrice = (price) => (Math.round(price * 100) / 100).toFixed(2);

      const setTooltipHtml = (name, date, price) => {
        legendDiv.innerHTML = `
                <div style="font-size: 24px; margin-left: 33px; margin-top:40px; margin-bottom:8px">${name}</div>
                <div style="font-size: 22px; margin-left: 33px;  margin-bottom:8px">${price}</div>
                <div style="margin-left: 33px;">${date}</div>
            `;
      };

      const updateLegend = (param) => {
        const validCrosshairPoint = !(
          param === undefined ||
          param.time === undefined ||
          param.point.x < 0 ||
          param.point.y < 0
        );
        const bar = validCrosshairPoint
          ? param.seriesData.get(areaSeries)
          : getLastBar(areaSeries);
        const time = bar.time;
        const price = bar.value !== undefined ? bar.value : bar.close;
        const formattedPrice = formatPrice(price);
        setTooltipHtml(symbolName, time, formattedPrice);
      };

      chart.subscribeCrosshairMove(updateLegend);

      // Initial update
      updateLegend(undefined);

      const toolTipWidth = 80;
      const toolTipHeight = 80;
      const toolTipMargin = 15;

      const toolTip = document.createElement("div");
      toolTip.style = `width: 96px; height: 80px; position: absolute; display: none; padding: 20px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
      toolTip.style.background = "white";
      toolTip.style.color = "black";
      toolTip.style.borderColor = "#2962FF";
      chartContainerRef.current.appendChild(toolTip);

      chart.timeScale().fitContent(); //시간축이 박스에 꽉차게

      return () => chart.remove();
    }
  }, [backtestResult]);

  useEffect(() => {
    if (integratedBacktestResult) {
      console.log(integratedBacktestResult.integrated_portfolio);
      const chartOptions = {
        layout: {
          textColor: "black",
          background: { type: "solid", color: "white" },
        },
      };

      const chart = createChart(integratedChartContainerRef.current, {
        width: integratedChartContainerRef.current.clientWidth,
        height: integratedChartContainerRef.current.clientHeight,
      });

      chart.applyOptions({
        rightPriceScale: {
          scaleMargins: {
            top: 0.4, // leave some space for the legend
            bottom: 0.15,
          },
        },
        crosshair: {
          horzLine: {
            visible: true,
            labelVisible: true,
          },
        },
        grid: {
          vertLines: {
            visible: true,
          },
          horzLines: {
            visible: true,
          },
        },
      });

      //Line Series 세팅
      const lineSeriesOne = chart.addLineSeries({ color: colors[0] });
      const lineSeriesTwo = chart.addLineSeries({ color: colors[1] });
      //Area Series 세팅
      const areaSeries = chart.addAreaSeries({
        topColor: "rgba(195, 195, 200, 0.56)",
        bottomColor: "rgba(195, 195, 200, 0.05)",
        lineColor: colors[2],
      });

      const transformedData = transformData(
        integratedBacktestResult.integrated_portfolio
      );

      lineSeriesOne.setData(transformedData[0].series);
      lineSeriesTwo.setData(transformedData[1].series);
      areaSeries.setData(transformedData[2].series);

      // 반응형 범례 생성
      const legendDiv = document.createElement("div");
      legendDiv.style.position = "absolute";
      legendDiv.style.left = "12px";
      legendDiv.style.top = "12px";
      legendDiv.style.zIndex = 1;
      legendDiv.style.fontSize = "14px";
      legendDiv.style.fontFamily = "sans-serif";
      legendDiv.style.lineHeight = "18px";
      legendDiv.style.fontWeight = "300";
      legendDiv.style.color = "black";
      integratedChartContainerRef.current.appendChild(legendDiv);

      const symbolName = "평균 수익률";

      const getLastBar = (series) => {
        const lastIndex = series.dataByIndex(Number.MAX_SAFE_INTEGER, -1);
        return series.dataByIndex(lastIndex);
      };

      // const formatPrice = (price) => (Math.round(price * 100) / 100).toFixed(2);

      const setTooltipHtml = (name, date, price) => {
        legendDiv.innerHTML = `
                <div style="font-size: 24px; margin-left: 33px; margin-top:40px; margin-bottom:8px">${name}</div>
                <div style="font-size: 22px; margin-left: 33px;  margin-bottom:8px">${price}</div>
                <div style="margin-left: 33px;">${date}</div>
            `;
      };

      const toolTipWidth = 80;
      const toolTipHeight = 80;
      const toolTipMargin = 15;

      const toolTip = document.createElement("div");
      toolTip.style = `width: 96px; height: 80px; position: absolute; display: none; padding: 20px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
      toolTip.style.background = "white";
      toolTip.style.color = "black";
      toolTip.style.borderColor = "#2962FF";
      integratedChartContainerRef.current.appendChild(toolTip);

      chart.timeScale().fitContent(); //시간축이 박스에 꽉차게

      return () => chart.remove();
    }
  }, [integratedBacktestResult]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative" }}>
        <RunBacktestButton
          onClickIntegrated={handleIntegratedBacktest}
          onClick={() => setActiveCategoryFitler((prev) => !prev)}
        ></RunBacktestButton>
        {activeCategoryFitler && (
          <DropDownContainer>
            <SearchContainer padding="10px">
              <SearchText>카테고리</SearchText>
              {categoryList.map((category) => (
                <RadioContainer key={category.id}>
                  <RadioLabel>
                    <RadioInput
                      type="radio"
                      name="category"
                      value={category.id}
                      onChange={handleCategoryChange}
                    />
                    {category.id}
                  </RadioLabel>
                </RadioContainer>
              ))}
            </SearchContainer>
          </DropDownContainer>
        )}
      </div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {backtestResult && (
        <StyledGraphDiv width={props.width}>
          <div
            ref={chartContainerRef}
            style={{ width: "100%", height: "300px" }} // div 스타일 설정
          ></div>
          <section>
            <p>샤프 비율</p> {backtestResult.sharpe_ratio.toFixed(3)}
            <p> 수익률 표준편차</p>{" "}
            {backtestResult.standard_deviation.toFixed(3)}
            <p> 연간 수익률</p> {backtestResult.annual_return.toFixed(3)}
            <p> 총 잔고</p> {backtestResult.total_balance.toFixed(3)}
            <p> 최대 낙폭</p> {backtestResult.mdd.toFixed(3)}
          </section>
        </StyledGraphDiv>
      )}

      {integratedBacktestResult && (
        <StyledGraphDiv width={props.width}>
          <div
            ref={integratedChartContainerRef}
            style={{ width: "100%", height: "300px" }} // div 스타일 설정
          ></div>
          <section>
            <p>샤프 비율</p>{" "}
            {integratedBacktestResult.integrated_portfolio.sharpe_ratio.toFixed(
              3
            )}
            <p> 수익률 표준편차</p>
            {integratedBacktestResult.integrated_portfolio.standard_deviation.toFixed(
              3
            )}
            <p> 연간 수익률</p>{" "}
            {integratedBacktestResult.integrated_portfolio.annual_return.toFixed(
              3
            )}
            <p> 총 잔고</p> {integratedBacktestResult.integrated_portfolio.total_balance.toFixed(3)}
            <p> 최대 낙폭</p>{" "}
            {integratedBacktestResult.integrated_portfolio.mdd.toFixed(3)}
          </section>
        </StyledGraphDiv>
      )}
    </div>
  );
};

export default BacktestChart;
