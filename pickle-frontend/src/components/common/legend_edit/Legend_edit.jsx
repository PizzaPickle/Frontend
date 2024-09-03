import {
  ColorCircle,
  LegendDiv,
  LegendText,
  LegendLeftContainer,
} from "./legend_edit.style";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setInputValue } from "../../../store/reducers/inputAction";
import { FormControl } from "react-bootstrap";


export default function LegendEdit({ category, activate, gap }) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(setInputValue(event.target.value));
  };


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
      <LegendText><FormControl type="text" onChange={handleChange}></FormControl>%</LegendText>
      
    </LegendDiv>
  );
}
