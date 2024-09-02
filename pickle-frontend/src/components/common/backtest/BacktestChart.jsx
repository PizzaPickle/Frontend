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
