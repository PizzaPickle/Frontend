import { CircularGraph } from "./CircularGraph";
import { StyledGraphDiv } from "./CircularGraph.style";

export default function Circular(props) {
  return (
    <StyledGraphDiv className="graphDiv" width={props.width} height={props.height} top={props.top} left={props.left}>
      <CircularGraph data={props.data} />
    </StyledGraphDiv>
  );
}
