import ProgressBar from "./ProgressBar";
import { StockTableText, StockTableContainer, Table, Horizon, Td } from "./stockTable.style";

export default function StockTable({ productList, width }) {
  const keysOrder = ["name", "code", "themeName", "ratio"];

  return (
    <StockTableContainer width={width}>
      <Table>
        <thead>
          <tr>
            <th>
              <StockTableText>종목명</StockTableText>
            </th>
            <th>
              <StockTableText>종목코드</StockTableText>
            </th>
            <th>
              <StockTableText>테마</StockTableText>
            </th>
            <th>
              <StockTableText>매매 비율</StockTableText>
            </th>
          </tr>
        </thead>
        <Horizon />
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
