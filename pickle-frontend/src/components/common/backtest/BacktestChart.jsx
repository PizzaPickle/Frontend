import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { StyledGraphDiv } from './Backtest.style';

const BacktestChart = (props) => {

    //불러온 백테스팅 JSON 데이터를 정제 
      const transformData = (data) => {
        return Object.entries(data).map(([stockName, series]) => ({
            stockName: stockName,
            series: Object.entries(series).map(([time, value]) => ({
                time: time,
                value: value
            }))
        }));
    };

  const chartContainerRef = useRef(null);
  const [backtestResult, setBacktestResult] = useState(null);
  const [error, setError] = useState(null);
  const [legend, setLegend] = useState('');

  const handleBacktest = async () => {
    const url = "/backtest";
    
    //요청할 포트폴리오 데이터 형식
    const portData = {
      start_from_latest_stock: "false",
      portfolio: {
        stock_list: [
          ["AAPL", "Apple", 0.25, "true"],
          ["005930", "삼성전자", 0.5, "false"],
        ],
        balance: 1000000,
        interval_month: 1,
        start_date: "20100101",
        end_date: "20221231"
      }
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(portData)
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
            textColor: 'black',
            background: { type: 'solid', color: 'white' },
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
      const lineSeriesOne = chart.addLineSeries({ color: '#FF6767' });
      const lineSeriesTwo = chart.addLineSeries({ color: '#FF906E' });
      //Area Series 세팅
      const areaSeries = chart.addAreaSeries({
        topColor: 'rgba(195, 195, 200, 0.56)',
        bottomColor: 'rgba(195, 195, 200, 0.05)',
        lineColor: 'rgba(195, 195, 200, 1)',
      });

      const transformedData = transformData(backtestResult.portfolio);
      
      lineSeriesOne.setData(transformedData[0].series);
      lineSeriesTwo.setData(transformedData[1].series);
      areaSeries.setData(transformedData[2].series);
      

        // 반응형 범례 생성
        const legendDiv = document.createElement('div');
        legendDiv.style.position = 'absolute';
        legendDiv.style.left = '12px';
        legendDiv.style.top = '12px';
        legendDiv.style.zIndex = 1;
        legendDiv.style.fontSize = '14px';
        legendDiv.style.fontFamily = 'sans-serif';
        legendDiv.style.lineHeight = '18px';
        legendDiv.style.fontWeight = '300';
        legendDiv.style.color = 'black';
        chartContainerRef.current.appendChild(legendDiv);
        
        const symbolName = '평균 수익률';

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
                param === undefined || param.time === undefined || param.point.x < 0 || param.point.y < 0
            );
            const bar = validCrosshairPoint ? param.seriesData.get(areaSeries) : getLastBar(areaSeries);
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

        const toolTip = document.createElement('div');
        toolTip.style = `width: 96px; height: 80px; position: absolute; display: none; padding: 20px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
        toolTip.style.background = 'white';
        toolTip.style.color = 'black';
        toolTip.style.borderColor = '#2962FF';
        chartContainerRef.current.appendChild(toolTip);

        
        chart.timeScale().fitContent(); //시간축이 박스에 꽉차게

      return () => chart.remove();
    }
  }, [backtestResult]);

  return (
    <>
    <button onClick={handleBacktest}>Run Backtest</button>
    
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {backtestResult && (
        <StyledGraphDiv width={props.width}>
        <div
        ref={chartContainerRef}
        style={{ width: '100%', height: '300px' }} // div 스타일 설정
        >
        </div>
        <section>
        <p>샤프 비율</p> {backtestResult.sharpe_ratio}
         <p> 수익률 표준편차</p> {backtestResult.standard_deviation}
         <p> 연간 수익률</p> {backtestResult.annual_return}
         <p> 총 잔고</p> {backtestResult.total_balance.toFixed(3)}
         <p> 최대 낙폭</p> {backtestResult.mdd.toFixed(3)}
        </section>
        </StyledGraphDiv>
    )
    }
    
    </>
  );
};

export default BacktestChart;