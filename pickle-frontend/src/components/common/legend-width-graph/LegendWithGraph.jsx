import {
  CircularDiv,
  LegendDiv,
  LegendWithGraphDiv,
  LegendListDiv,
} from "./LegendWithGraph.style";
import Circular from "../circular-graph/Circular";
import Legend from "../legend/Legend";

export default function LegendWithGraph({ data, width, height }) {
  return (
    <LegendWithGraphDiv width={`${width}px`} height={`${height}px`}>
      <CircularDiv >
        <Circular width="100%" height="100%" data={data} />
      </CircularDiv>
      <LegendDiv>
        <LegendListDiv>
        {data.map((category, index) => (
          <Legend category={category} />
        ))}
        </LegendListDiv>
      </LegendDiv>
    </LegendWithGraphDiv>
  );
}
