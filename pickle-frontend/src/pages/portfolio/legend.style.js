import styled, { css } from "styled-components";
import { theme } from "../../theme";

export const LegendDiv = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: ${theme.colors.line_gray};
    transition: 0.5s;
  }
  ${({ activate }) => {
    if (activate) {
      return css`
        background: white;
        border: 2px solid ${theme.colors.cobartblue};
        &:hover {
          background: white;
          transition: 0.1s;
        }
      `;
    }
  }};
`;

export const LegendText = styled.p`
  margin: 0;
  background: none;
  color: ${theme.colors.deep_gray};
`;

export const ColorCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

export const LegendLeftContainer = styled.div`
  width: 680px;
  display: flex;
  align-items: center;
  background: none;
  justify-content: space-around;
  /* gap: 50px; */
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr;
  justify-items: center;
`;

export const LegendAlert = styled.div`
  background-color: white;
`;
export const LengendTextGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

export const Table = styled.div`
  position: absolute;
  left: -30%;
  top: 170%;
`;
export const ProfitRatioText = styled.span`
  color: ${({ isPositive }) => (isPositive ? "red" : "blue")};
  margin: 0;
  background: none;
`;
