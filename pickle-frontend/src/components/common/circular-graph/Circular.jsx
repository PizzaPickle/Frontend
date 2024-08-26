import { CircularGraph } from "./CircularGraph";
import { StyledGraphDiv } from "./CircularGraph.style";

export default function Circular(props) {
  return (
    <StyledGraphDiv width={props.width} height={props.height}>
      <CircularGraph data={props.data} />
    </StyledGraphDiv>
  );
}
