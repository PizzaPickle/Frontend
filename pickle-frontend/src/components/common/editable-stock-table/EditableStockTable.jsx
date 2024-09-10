import {
  StockTableText,
  StockTableContainer,
  Table,
  Horizon,
  Td,
  Thead,
  Th,
  AlertContainer,
  Tbody,
  Tr,
} from "./editable-stockTable.style";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";
import ProductRemoveModal from "./ProductRemoveModal";
import { IoMdRemoveCircle } from "react-icons/io";

export default function EditableStockTable({ category, productList, width }) {
  const keysOrder = ["name", "code", "themeName", "ratio"];
  // console.log(category.isValidProductRatio);
  const [removeModal, setRemoveModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function removeProduct(product) {
    // console.log(product);
    setRemoveModal(true);
    setSelectedProduct(product)
  }

  return (
    <StockTableContainer width={width}>
      <Table>
        <Thead>
          <Tr>
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
          </Tr>
        </Thead>
        {/* <Horizon /> */}
        <Tbody>
          {productList?.map((product) => (
            <Tr key={product.code}>
              <IoMdRemoveCircle
                style={{ position: "absolute", top: "20px" }}
                onMouseOver={({ target }) => (target.style.color = "red")}
                onMouseOut={({ target }) => (target.style.color = "black")}
                onClick={()=>removeProduct(product)}
              />
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
            </Tr>
          ))}
        </Tbody>
      </Table>
      {!category.isValidProductRatio && (
        <AlertContainer>종목들의 비율 합은 100이여야 합니다.</AlertContainer>
      )}
      <ProductRemoveModal
        show={removeModal}
        handleClose={() => setRemoveModal(false)}
        product={selectedProduct}
        category={category.id}
      />
    </StockTableContainer>
  );
}
