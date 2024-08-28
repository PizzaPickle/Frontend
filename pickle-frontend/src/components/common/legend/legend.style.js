import styled from "styled-components";
import { theme } from "../../../theme";

export const LegendDiv = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: white;
    transition: 0.5s;
    border-radius: 10px;
  }
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
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
`;
