import ProgressBar from "./ProgressBar";
import {
  StockTableText,
  StockTableContainer,
  Table,
  Horizon,
  Td,
  Thead,
  Th,
} from "./stockTable.style";

export default function StockTable({ productList, width }) {
  const keysOrder = ["name", "code", "themeName", "ratio"];

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
          {productList.map((product) => (
            <tr key={product.code}>
              {keysOrder.map((value) => (
                <Td key={value}>
                  {value === "ratio" ? (
                    <ProgressBar ratio={product[value]} />
                  ) : (
                    <StockTableText>{product[value]}</StockTableText>
                  )}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </StockTableContainer>
  );
}
