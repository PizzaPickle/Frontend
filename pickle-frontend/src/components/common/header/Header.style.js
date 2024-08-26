import styled, { css } from "styled-components";

export const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin: 10px 0px;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const StyledHeaderLogoDiv = styled.div`
  margin-left: 30px;
`;

export const StyledHeaderParentDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 50px;
  width: 100%;
`;
