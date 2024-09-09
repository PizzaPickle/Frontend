import styled, { css } from "styled-components";
import { theme } from "../../../theme";

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

export const LegendInput = styled.input`
  border: none;
  color: ${theme.colors.deep_gray};
  width: 60%;
  background: transparent;
  text-align: right;
  outline: none;
  -moz-appearance: textfield; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; /* Remove margin in Chrome */
  }

  &::-moz-inner-spin-button {
    appearance: none;
    margin: 0; /* Remove margin in Firefox */
  }
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
  gap: ${(props) => props.gap || "10px"};
  background: none;
`;

export const LegendAlert = styled.div`
  background-color: white;
`;
