import {
  ColorCircle,
  LegendDiv,
  LegendText,
  LegendLeftContainer,
} from "./legend.style";

export default function Legend({ category, activate }) {
  return (
    <LegendDiv activate={activate}>
      <LegendLeftContainer>
        <ColorCircle color={category.color}></ColorCircle>
        <LegendText>{category.id}</LegendText>
      </LegendLeftContainer>
      <LegendText>{category.value}%</LegendText>
    </LegendDiv>
  );
}
