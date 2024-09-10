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
        
        });
        total += categoryTotal;
      });
      console.log("dd", total);
      return total;
    };

    const totalAmount = calculateTotalEvaluationAmount();
    setTotalAllevaluationPrice(totalAmount);
  }, [data, stockPrices]);
 

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
