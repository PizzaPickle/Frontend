import {
  StockTableText,
  StockTableContainer,
  Table,
  Horizon,
  Td,
  Thead,
  Th,
  AlertContainer,
} from "./editable-stockTable.style";
import React from "react";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";

export default function EditableStockTable({ category, productList, width }) {
  const keysOrder = ["name", "code", "themeName", "ratio"];
  console.log(category.isValidProductRatio);

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
              <StockTableText>매매 비율</StockTableText>
            </Th>
          </tr>
        </Thead>
        {/* <Horizon /> */}
        <tbody>
          {productList?.map((product) => (
            <tr key={product.code}>
              {keysOrder.map((value) => (
                <Td key={value}>
                  {value === "ratio" ? (
                    <ProgressBar
                      category={category}
                      ratio={product[value]}
                      product={product}
                    />
                  ) : (
                    <StockTableText>{product[value]}</StockTableText>
                  )}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      {!category.isValidProductRatio && (
        <AlertContainer>종목들의 비율 합은 100이여야 합니다.</AlertContainer>
      )}
    </StockTableContainer>
  );
}
