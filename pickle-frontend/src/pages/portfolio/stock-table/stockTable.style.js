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
  width: 930px;
  position: relative;
  text-align: center;
  border-collapse: collapse;
  justify-content: space-around;
  
`;

export const Thead = styled.thead`
  border-bottom: 2px solid ${theme.colors.line_gray};
`;

export const Th = styled.th`
  padding: 1rem 0;
`;

export const Td = styled.td`
  max-width: 40px;
  min-width: 25px;
  padding: 1rem 0 0.5rem 0;
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
