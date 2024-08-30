import {
  CircularDiv,
  LegendDiv,
  LegendWithGraphDiv,
  LegendListDiv,
} from "./LegendWithGraph.style";
import Circular from "../circular-graph/Circular";
import Legend from "../legend/Legend";

export default function GraphWithLegend({ data, width, height, top, left, fontSize, gap }) {
  return (
    <LegendWithGraphDiv top={top} left={left} width={`${width}px`} height={`${height}px`}>
      {/* <CircularDiv >
        <Circular width="300px" height="250px" data={data} />
      </CircularDiv> */}
      <LegendDiv>
        <LegendListDiv fontSize={fontSize} >
        {data.map((category) => (
          <Legend key={category.label} category={category} />
        ))}
        </LegendListDiv>
      </LegendDiv>
    </LegendWithGraphDiv>
  );
}
