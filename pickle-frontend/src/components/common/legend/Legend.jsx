import {
  ColorCircle,
  LegendDiv,
  LegendText,
  LegendLeftContainer,
} from "./legend.style";
import { useState } from "react";
import React from "react";

export default function Legend({ category, activate, gap }) {
  const [isHovered, setIsHovered] = useState(false);
  

  return (
    <LegendDiv onMouseEnter={() => {
      setIsHovered(true);
      console.log("hovered")
    }}
    onMouseLeave={() => {
      setIsHovered(false);
      console.log("left")
    }}
    >
      <LegendLeftContainer gap={gap}>
        <ColorCircle color={category.color}></ColorCircle>
        <LegendText>{category.id}</LegendText>
      </LegendLeftContainer>
      <LegendText>{category.value}%</LegendText>
      
    </LegendDiv>
  );
}
