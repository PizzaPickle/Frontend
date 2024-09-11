import styled, { css, keyframes } from "styled-components";

export const StyledCategoryLegend = styled.div`
  cursor: pointer;
`;

export const LegendListDiv = styled.div`
  width: 100%;
  font-size: ${(props) => props.fontSize || "medium"};
`;
