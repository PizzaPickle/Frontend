import {
  CircularDiv,
  LegendDiv,
  LegendWithGraphDiv,
  LegendListDiv,
} from "./LegendWithGraph_edit.style";
import Circular from "../circular-graph/Circular";
import Legend from "../legend_edit/Legend_edit";
import { useDispatch } from 'react-redux';

export default function LegendWithGraph({ data, width, height, top, left, fontSize, gap }) {
  
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(setInputValue(event.target.value));
  };

  return (
    <LegendWithGraphDiv top={top} left={left} width={width} height={height}>
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
