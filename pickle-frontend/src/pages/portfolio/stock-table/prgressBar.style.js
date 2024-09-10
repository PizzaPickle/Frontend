import styled from "styled-components";

export const BackgroundBar = styled.div`
  width: 80%;
  height: 5px;
  border-radius: 5px;
  background-color: #dfdfdf;
  margin: 0 auto;
  position: relative;
`;

export const GaugeBar = styled.div`
  width: ${({ width }) => width};
  height: 5px;
  border-radius: 5px;
  background-color: #0046ff;
`;

export const PercentText = styled.p`
  margin: 0;
  font-size: x-small;
  color: gray;
  position: absolute;
  right: 0;
  top: 10px;
`;
