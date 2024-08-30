import styled from "styled-components";

export const LegendWithGraphDiv = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  /* display: grid; */
  /* grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(2, 1fr); */
  position: absolute;
  top: ${(props) => props.top || '0%'};
  left: ${(props) => props.left || '0%'};
`;

export const CircularDiv = styled.div`
  /* grid-area: 1 / 1 / 3 / 6; */
  /* transform: translateY(10%); */
`;

export const LegendDiv = styled.div`
  /* grid-area: 1 / 6 / 3 / 11; */
  /* width: 100%; */
  display: flex;
  align-items: center;
`;

export const LegendListDiv = styled.div`
  width: 100%;
  font-size: ${(props) => props.fontSize || 'medium'};
`