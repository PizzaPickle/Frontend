import React, { useEffect, useState, useRef } from 'react'; // 훅을 제대로 가져왔는지 확인
import { useSelector } from 'react-redux';
import { BoxContainer, Header, Title, Content, Line, Body, Row, StockContent, StockContainer } from './StrategyBox.style';

export default function StrategyBox(props) {
  const { productList, stockIds, inputValue, categoryRatio, categoryName } = props;
  const [formattedProducts, setFormattedProducts] = useState([]); // useState 초기값으로 빈 배열 설정
  const [productPrices, setProductPrices] = useState({});
  const { token } = useSelector((state) => state.user); // token이 제대로 설정되었는지 확인
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const wsConnections = useRef({}); // WebSocket 연결을 저장할 ref

  // 최초 가격 가져오기
  useEffect(() => {
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
              // requestCode = `R${product.code}`;
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
          acc[code] = price;
          return acc;
        }, {});

        setProductPrices(pricesMap);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPrices();
  }, [productList]);

  // WebSocket 연결
  useEffect(() => {
    console.log(stockIds);
    stockIds.forEach(id => {
      if (!wsConnections.current[id]) {
        const ws = new WebSocket('ws://3.34.126.55:8080');
        ws.onopen = () => {
          console.log(`WebSocket 연결이 열렸습니다. ID: ${id}`);
          ws.send(JSON.stringify({ type: "subscribe", id }));
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setProductPrices(prevPrices => ({
            ...prevPrices,
            [data.code]: data.currentPrice,
          }));
        };

        ws.onclose = () => {
          console.log(`WebSocket 연결이 닫혔습니다. ID: ${id}`);
          delete wsConnections.current[id];
        };

        ws.onerror = (error) => {
          console.error(`WebSocket 에러 발생! ID: ${id}`, error);
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
      const updatedProducts = productList.map(product => ({
        ...product,
        formattedValue: formatNumber((validInputValue * categoryRatio * product.ratio).toFixed(0)),
      }));
      setFormattedProducts(updatedProducts);
    }
  }, [inputValue, productList, categoryRatio]);

  // API 호출
  // useEffect(() => {
  //   const sendHeldQuantities = async () => {
  //     if (!formattedProducts || formattedProducts.length === 0) return;
  //     const heldQuantities = formattedProducts.map(product => ({
  //       productCode: product.code,
  //       heldQuantity: parseFloat(product.formattedValue.replace(/,/g, '')),
  //     }));

  //     try {
  //       const response = await fetch('/api/pickle-customer/trade/quantity', {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(heldQuantities),
  //       });

  //       if (!response.ok) {
  //         throw new Error('API 호출 실패');
  //       }

  //       const data = await response.json();
  //       const additionalAmounts = data.reduce((acc, item) => {
  //         acc[item.productCode] = item.heldAmount;
  //         return acc;
  //       }, {});

  //       const updatedProducts = formattedProducts.map(product => ({
  //         ...product,
  //         additionalAmount: additionalAmounts[product.code] || 0,
  //       }));

  //       setFormattedProducts(updatedProducts);
  //     } catch (err) {
  //       console.error('API 호출 에러:', err.message);
  //     }
  //   };

  //   sendHeldQuantities();
  // }, [productList, inputValue, formattedProducts, categoryRatio, token]);

  const formatNumber = (value) => {
    const [integer, decimal] = value.split('.');
    return integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (decimal ? '.' + decimal : '');
  };

  return (
    <BoxContainer>
      <Header>
        <Title>
          <Content>종목명(종목코드)</Content>
          <Content>보유비율</Content>
          <Content>전략비율</Content>
          <Content>금액</Content>
          <Content>수량</Content>
          <Content>추가 매수/매도수량</Content>
          <Content>추가 매수/매도금액</Content>
        </Title>
      </Header>
      <Line />
      <Body>
        {formattedProducts.map((product, index) => {
          const currentPrice = parseFloat(productPrices[product.code]) === 0 || isNaN(parseFloat(productPrices[product.code])) ? 1 : parseFloat(productPrices[product.code]);
          console.log(currentPrice);
          
          const amount = (parseFloat(product.formattedValue.replace(/,/g, '')) / currentPrice).toFixed(1);
          const additionalValue = (product.additionalAmount * currentPrice).toFixed(0)||1;

          return (
            <Row key={index}>
              <StockContainer><StockContent>{product.name}({product.code})</StockContent></StockContainer>
              <StockContainer><StockContent>{product.myStrategyRatio}%</StockContent></StockContainer>
              <StockContainer><StockContent>{product.ratio}%</StockContent></StockContainer>
              <StockContainer><StockContent>{product.formattedValue}원</StockContent></StockContainer>
              <StockContainer><StockContent>{amount}주</StockContent></StockContainer>
              <StockContainer><StockContent>{product.additionalAmount}주</StockContent></StockContainer>
              <StockContainer><StockContent>{additionalValue}원</StockContent></StockContainer>
            </Row>
          );
        })}
      </Body>
    </BoxContainer>
  );
}
