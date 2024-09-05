import { CircularGraph } from "./CircularGraph";
import { StyledGraphDiv } from "./CircularGraph.style";
import React from "react";

export default function Circular(props) {
  return (
    <StyledGraphDiv className="graphDiv" width={props.width} height={props.height} top={props.top} left={props.left}>
      <CircularGraph data={props.data} />
    </StyledGraphDiv>
  );
}
