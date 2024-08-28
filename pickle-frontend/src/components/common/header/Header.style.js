import styled, { css } from "styled-components";

export const StyledHeaderDiv = styled.div`
    position: fixed;
    width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin: 10px 0px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line_gray};
`;

export const StyledHeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    margin: 50px;
    gap: 20px;
`
