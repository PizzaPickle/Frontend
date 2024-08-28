import styled from "styled-components";
import { theme } from "../../../theme";

export const StockTableContainer = styled.div`
  width: ${({ width }) => width};
`;

export const StockTableText = styled.p`
  margin: 0;
  font-weight: normal;
  color: ${theme.colors.deep_gray};
`;

export const Table = styled.table`
  width: 100%;
  position: relative;
  text-align: center;
  border-collapse: separate;
  border-spacing: 30px 1rem;
`;

export const Horizon = styled.hr`
  position: absolute;
  left: 0;
  right: 0;
  padding: 0 1rem;
  margin: 0 2rem;
  background: ${theme.colors.line_gray};
  border: 0;
  height: 1px;
`;
