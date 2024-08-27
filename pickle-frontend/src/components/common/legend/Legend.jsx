import {
  ColorCircle,
  LegendDiv,
  LegendText,
  LegendLeftContainer,
} from "./legend.style";

export default function Legend({ category }) {
  return (
    <LegendDiv>
      <LegendLeftContainer>
        <ColorCircle color={category.color}></ColorCircle>
        <LegendText>{category.id}</LegendText>
      </LegendLeftContainer>
      <LegendText>{category.value}%</LegendText>
    </LegendDiv>
  );
}
