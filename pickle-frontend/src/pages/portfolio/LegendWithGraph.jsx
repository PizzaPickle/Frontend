import {
  CircularDiv,
  LegendDiv,
  LegendWithGraphDiv,
  LegendListDiv,
  MenuGroup,
  Menu,
  Line
} from "./LegendWithGraph.style";

import Legend from "./Legend";
import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";


export default function LegendWithGraph({ data, width, height, top, left, fontSize, gap, ishover }) {
  const { prices: stockPrices } = useSelector((state) => state.stockPrices);
  const [categories, setCategories] = useState([]);
  const [totalAllevaluationPrice, setTotalAllevaluationPrice]=useState(0);
  
  useEffect(() => {
    const calculateTotalEvaluationAmount = () => {
      let total = 0;
      data.forEach((category) => {
        let categoryTotal = 0;
        category.productDtos.forEach((product) => {
          categoryTotal += (stockPrices[product.code] || 1) * product.quantity;
          console.log('jj',categoryTotal);
        });
        total += categoryTotal;
      });
      console.log("dd", total);
      return total;
    };

    const totalAmount = calculateTotalEvaluationAmount();
    setTotalAllevaluationPrice(totalAmount);
  }, [data, stockPrices]);


  // const calculateTotalEvaluationAmount = () => {
  //   let total = 0;
  //   categories.forEach((category) => {
  //     category.productDtos.forEach((product) => {
  //       // 각 종목의 평가금액을 계산하여 더합니다 (실시간 데이터 사용하지 않고 이미 계산된 값 사용)
  //       total += (stockPrices[product.code] || 0) * product.quantity;
  //     });
  //   });
  
  //   return total;
  // };
  // const totalEvaluationAmountAllCategories = calculateTotalEvaluationAmount();
 

  return (
    <LegendWithGraphDiv top={top} left={left} width={width} height={height}>
      <MenuGroup>
      <Menu>분류</Menu>
      <Menu>수익률</Menu>
      <Menu>총 매입금액</Menu>
      <Menu>총 평가금액</Menu>
      <Menu>현재 비율</Menu>
      <Menu>기존 비율</Menu>
    </MenuGroup>
    <Line/>
      <LegendDiv>
        <LegendListDiv fontSize={fontSize} >
        {data.map((category) => (
          <Legend key={category.id} 
          category={category} 
          gap={gap} 
          totalEvaluationAmountAllCategories={totalAllevaluationPrice || 0}
          stockPrices={stockPrices}     
          />
        ))}
        </LegendListDiv>
      </LegendDiv>
    </LegendWithGraphDiv>
  );
}
