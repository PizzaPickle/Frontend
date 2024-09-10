import styled, { css } from "styled-components";

export const StyledHeaderDiv = styled.div`
    position: static;
    width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  margin-top: 10px;
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

    img {
      margin-bottom: 10px;
    }
`
