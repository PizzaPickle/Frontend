import React, { useEffect, useState, useRef } from 'react'; 
import { useSelector } from 'react-redux';
import { BoxContainer, Header, Title, Content, Line, Body, Row, StockContent, StockContainer, Stock_Content } from './StrategyBox.style';

export default function StrategyBox(props) {
  const { productList, stockIds, inputValue, categoryRatio, categoryName, triggerHeldQuantities, onPriceChange, onAmountChange, applyClicked } = props;
  const [formattedProducts, setFormattedProducts] = useState([]); 
  const [productPrices, setProductPrices] = useState({});
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const wsConnections = useRef({}); 
  const fetchInitialPrices = async () => {
    if (!productList.length) return;

    setLoading(true);
    setError(null);

    try {
      const requests = productList.map(product => {
        let apiUrl;
        let requestCode = product.code;

        // 카테고리별 API URL 설정
        switch (categoryName) {
          case '국내':
            apiUrl = '/api/stock/current-price';
            break;
          case '해외':
            apiUrl = '/api/overseas-stock/current-price';
            break;
          case '채권':
            apiUrl = '/api/bond/current-price';
            break;
          case 'ETF':
            apiUrl = '/api/ETF/current-price';
            break;
          default:
            apiUrl = '/api/stock/current-price';
            break;
        }

        return fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stockId: requestCode }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Product ${product.code} 가격 요청 실패`);
            }
            return response.json();
          })
          .then(data => ({
            code: product.code,
            price: data,
          }));
      });

      const prices = await Promise.all(requests);
      const pricesMap = prices.reduce((acc, { code, price }) => {
        acc[code] = parseFloat(price);
        return acc;
      }, {});

      setProductPrices(pricesMap);
      onPriceChange(pricesMap);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // 최초 가격 가져오기
  useEffect(() => {
  

    fetchInitialPrices();
  }, [productList, categoryName]);


  const shouldConnectWebSocket = () => {
    const now = new Date();
    const startHour = 9;
    const endHour = 15;
    const endMinute = 30;

    return (now.getHours() > startHour || (now.getHours() === startHour && now.getMinutes() >= 0)) &&
           (now.getHours() < endHour || (now.getHours() === endHour && now.getMinutes() <= endMinute));
  };

  // WebSocket 연결 (주석 처리된 코드)
  useEffect(() => {
    if (!shouldConnectWebSocket()) return;
    console.log(stockIds);
    stockIds.forEach(id => {
      if (!wsConnections.current[id]) {
        const ws = new WebSocket('ws://3.34.126.55:8080/api/realtime');
        ws.onopen = () => {
          console.log(`WebSocket 연결이 열렸습니다. ID: ${id}`);
          ws.send(JSON.stringify({ type: "subscribe", id }));
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log(data);
          setProductPrices(prevPrices => ({
            ...prevPrices,
            [data.stockId]: data.recvData,
          }));
        };

        ws.onclose = () => {
          console.log(`WebSocket 연결이 닫혔습니다. ID: ${id}`);
          fetchInitialPrices();
          delete wsConnections.current[id];
        };

        ws.onerror = (error) => {
          console.error(`WebSocket 에러 발생! ID: ${id}`, error);
          fetchInitialPrices();
        };

        wsConnections.current[id] = ws;
      }
    });

    return () => {
      Object.values(wsConnections.current).forEach(ws => ws.close());
    };
  }, [stockIds]);

  // formattedProducts 계산
  useEffect(() => {
    const validInputValue = isNaN(parseInt(inputValue, 10)) ? 0 : parseInt(inputValue, 10);

    if (productList.length && validInputValue && categoryRatio) {
      const updatedProducts = productList.map(product => {
        const currentPrice = parseFloat(productPrices[product.code]) || 1;
        const formattedValue = (validInputValue * categoryRatio * product.ratio).toFixed(0);
        let amount = (parseFloat(formattedValue.replace(/,/g, '')) / currentPrice).toFixed(2);
        if (categoryName === '해외') {
          console.log("해외")
          amount = (parseFloat(formattedValue.replace(/,/g, '')) / currentPrice/1350).toFixed(2);
          
        }
        
        
        return {
          ...product,
          formattedValue: formatNumber(formattedValue),
          amount,
        };
      });

      setFormattedProducts(updatedProducts);
      const amounts = updatedProducts.reduce((acc, product) => {
        acc[product.code] = parseFloat(product.amount); // product.code를 키로 사용
        return acc;
      }, {});
      onAmountChange(amounts);
    }
  }, [inputValue, productList, categoryRatio, productPrices]);

  // API 호출
  const sendHeldQuantities = async () => {
    if (!formattedProducts || formattedProducts.length === 0) return;

    const heldQuantities = formattedProducts.map(product => ({
      productCode: product.code,
      heldQuantity: product.amount || 0,  // Use default value if amount is undefined
    }));

    try {
      const response = await fetch('/api/pickle-customer/trade/quantity', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heldQuantities),
      });

      if (!response.ok) {
        throw new Error('API 호출 실패');
      }

      const data = await response.json();
      const additionalAmounts = data.reduce((acc, item) => {
        acc[item.productCode] = (item.heldAmount).toFixed(2);
        return acc;
      }, {});

      const updatedProducts = formattedProducts.map(product => ({
        ...product,
        additionalAmount: additionalAmounts[product.code] || 0,
      }));

      setFormattedProducts(updatedProducts);
    } catch (err) {
      console.error('API 호출 에러:', err.message);
      
    }
  };

  useEffect(() => {
    sendHeldQuantities();
  }, [triggerHeldQuantities]);

  const formatNumber = (value) => {
    const [integer, decimal] = value.split('.');
    return integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (decimal ? '.' + decimal : '');
  };

  return (
    <BoxContainer>
      <Header>
        <Title>
          <Content>종목명(종목코드)</Content>
          <Content>나의 보유비율</Content>
          <Content>전략비율</Content>
          <Content>전략금액</Content>
          <Content>전략수량</Content>
          <Content>추가 매수/매도수량</Content>
          <Content>추가 매수/매도금액</Content>
        </Title>
      </Header>
      <Line />
      <Body>
        {formattedProducts.map((product, index) => {
          const currentPrice = parseFloat(productPrices[product.code]) || 1;
          let amount = (parseFloat(product.formattedValue.replace(/,/g, '')) / currentPrice).toFixed(2);
          if (categoryName === '해외') {
            
            amount = (parseFloat(product.formattedValue.replace(/,/g, '')) / currentPrice/1350).toFixed(2);
            
          }
          
          const additionalAmount = product.additionalAmount || 0;  
          let additionalValue = (product.additionalAmount * currentPrice).toFixed(0) || 1;
          if (categoryName === '해외') {
            console.log("additionalAmount (해외):", additionalAmount);
            console.log("currentPrice (해외):", currentPrice);
            additionalValue = (product.additionalAmount * currentPrice * 1350).toFixed(0) || 1;
            console.log(additionalValue);
          }
     

          return (
            <Row key={index}>
              <StockContainer><StockContent>{product.name}({product.code})</StockContent></StockContainer>
              <StockContainer><StockContent>{product.myStrategyRatio*100}%</StockContent></StockContainer>
              <StockContainer><StockContent>{product.ratio*100}%</StockContent></StockContainer>
              <StockContainer><StockContent>{product.formattedValue}원</StockContent></StockContainer>
              <StockContainer><StockContent>{amount}주</StockContent></StockContainer>
              <StockContainer><Stock_Content applyClicked={applyClicked}>{additionalAmount}주</Stock_Content></StockContainer>
              <StockContainer><Stock_Content applyClicked={applyClicked}> {isNaN(additionalValue) ? '0원' : formatNumber(additionalValue) + '원'}
              </Stock_Content></StockContainer>
            </Row>
          );
        })}
      </Body>
    </BoxContainer>
  );
}
