import Circular from "../../circular-graph/Circular";
import Legend from "../../legend/Legend";
import StockTable from "../../stock-table/StockTable";
import {
  CircularDiv,
  LegendDiv,
  LegendListDiv,
  LegendWithGraphDiv,
} from "./StrategyBox.style";
import { useState } from "react";

export default function StrategyBox({ data, width, height }) {
  const [currentProducts, setCurProducts] = useState([]);

  function selectCategory(category) {
    setCurProducts(category.productList);
  }
  return (
    <div>
      <LegendWithGraphDiv width={`${width}px`} height={`${height}px`}>
        <CircularDiv>
          <Circular width="110%" height="100%" data={data} />
        </CircularDiv>
        <LegendDiv>
          <LegendListDiv>
            {data?.map((category) => (
              <div
                key={category.label}
                onClick={() => selectCategory(category)}
              >
                <Legend
                  activate={
                    currentProducts === category.productList ? true : false
                  }
                  category={category}
                />
              </div>
            ))}
          </LegendListDiv>
        </LegendDiv>
      </LegendWithGraphDiv>
      <StockTable productList={currentProducts} width={`${width}px`} />
    </div>
  );
}
