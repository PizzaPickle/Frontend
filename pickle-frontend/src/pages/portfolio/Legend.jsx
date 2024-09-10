import React from "react";
import {
  ColorCircle,
  LegendDiv,
  LegendText,
  LegendLeftContainer,
  LengendTextGroup,
  Table,
  ProfitRatioText
  

} from "./legend.style";
import { useState, useEffect } from "react";
import ProgressBar from "./stock-table/ProgressBar";
import StockTable from "./stock-table/StockTable";
export default function Legend({ category, activate, gap, totalEvaluationAmountAllCategories, onTotalEvaluationChange }) {
  const [isHovered, setIsHovered] = useState(false);
  const [totalEvaluationAmount, setTotalEvaluationAmount] = useState(0);

  const currentRatio =  (totalEvaluationAmount / totalEvaluationAmountAllCategories) * 100;
  const profitRatio = ((totalEvaluationAmount - category.totalPurchaseAmount) / category.totalPurchaseAmount) * 100;

  
  function formatNumber(number) {
    const numStr = number.toString();
    const [integerPart, decimalPart] = numStr.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}
  return (
    <>
      <LegendDiv
        onMouseEnter={() => {
          setIsHovered(true);
          console.log("hovered");
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          console.log("left");
        }}
      >
        <LegendLeftContainer gap={gap}>
          <LengendTextGroup>
            <ColorCircle color={category.color}></ColorCircle>
            <LegendText>{category.id}</LegendText>
          </LengendTextGroup>
          <ProfitRatioText isPositive={profitRatio > 0}>
            {profitRatio.toFixed(2)}%
          </ProfitRatioText>
          
          <LegendText>{formatNumber((category.totalPurchaseAmount).toFixed(0))}</LegendText>
          <LegendText>{formatNumber(totalEvaluationAmount.toFixed(0))}</LegendText>
          <LegendText>{currentRatio.toFixed(2)}%</LegendText>
          <LegendText>{(category.value * 100).toFixed(2)}%</LegendText>
          
  
        </LegendLeftContainer>
        
      </LegendDiv>
      <Table>
        {isHovered && (
          <div style={{ position: "absolute", top: "100%", left: 7, zIndex: 10 }}>
            <StockTable
              productList={category.productDtos}
              categoryName={category.id}
              width="400px"
              onTotalEvaluationChange={(newTotal) => {
                setTotalEvaluationAmount(newTotal);
              }}
            />
          </div>
        )}
      </Table>
    </>
  );
}
