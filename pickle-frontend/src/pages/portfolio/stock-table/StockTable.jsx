import React, {useState, useEffect} from "react";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";
import {
  StockTableText,
  StockTableContainer,
  Table,
  Horizon,
  Td,
  Thead,
  Th,
} from "./stockTable.style";

export default function StockTable({ productList, width, categoryName, onTotalEvaluationChange }) {
  const { prices: stockPrices } = useSelector((state) => state.stockPrices);
  const [productPrices, setProductPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalEvaluationAmount, setTotalEvaluationAmount] = useState(0);

  const calculateEvaluationAmount = (product) => {
    const currentPrice = parseFloat(stockPrices[product.code]) === 0 || isNaN(parseFloat(stockPrices[product.code])) ? 1 : parseFloat(stockPrices[product.code]);
    console.log(currentPrice);
    return product.quantity * currentPrice;
  };



  useEffect(() => {
    if (productList.length && Object.keys(stockPrices).length) {
      const totalAmount = productList.reduce((acc, product) => {
        return acc + calculateEvaluationAmount(product);
      }, 0);
      
      // 부모 컴포넌트에 값 전달
      if (onTotalEvaluationChange) {
        onTotalEvaluationChange(totalAmount); //모든 상품의 평가금액
      }
  
      // totalEvaluationAmount 상태 업데이트
      setTotalEvaluationAmount(totalAmount);
    }
  }, [productList, productPrices, onTotalEvaluationChange]);
  return (
    <StockTableContainer width={width}>
      <Table>
        <Thead>
          <tr>
            <Th>
              <StockTableText>종목명</StockTableText>
            </Th>
            <Th>
              <StockTableText>종목코드</StockTableText>
            </Th>
            <Th>
              <StockTableText>테마</StockTableText>
            </Th>
            <Th>
              <StockTableText>보유비율</StockTableText>
            </Th>
            <Th>
              <StockTableText>기존비율</StockTableText>
            </Th>
            <Th>
              <StockTableText>보유수량</StockTableText>
            </Th>
            <Th>
              <StockTableText>매입금액</StockTableText>
            </Th>
            <Th>
              <StockTableText>평가금액</StockTableText>
            </Th>
            
            
          </tr>
        </Thead>
        {/* <Horizon /> */}
        <tbody>
        {productList.map((product) => {
            const evaluationAmount = calculateEvaluationAmount(product);
            const holdingRatio = totalEvaluationAmount > 0 ? (evaluationAmount / totalEvaluationAmount) : 0;

            return (
              <tr key={product.code}>
                <Td>{product.name} </Td>
                <Td>{product.code}</Td>
                <Td>{product.themeName}</Td>
                <Td>
                  <ProgressBar ratio={(holdingRatio * 100).toFixed(2)} /> {/* 보유비율을 ProgressBar로 표시 */}
                </Td>
                <Td>
                  {product.ratio && <ProgressBar ratio={product.ratio * 100} />} {/* 기존비율을 ProgressBar로 표시 */}
                </Td>
                <Td>{product.quantity}</Td>
                <Td>{product.purchaseAmount}</Td>
                <Td>{evaluationAmount.toFixed(1)}</Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </StockTableContainer>
  );
}
