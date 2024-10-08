import styled, { css } from "styled-components";

export const StyledSideDiv = styled.div`
  position: static;
  height: 100%;
  width: 210px;
  z-index: 100;
  align-content: center;
  box-shadow: 1px 0 0 0 ${({ theme }) => theme.colors.line_gray};
  margin-left: 10px;
  padding-left: 10px;
  padding-right: 30px;

  .icon {
    width: 15px;
  }
`;

export const StyledSideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  color: ${({ theme }) => theme.colors.sidebar};
`;

export const StyledSideText = styled(StyledSideContent)`
  display: flex;
  gap: 15px;
  align-items: center;
  transition: background-color 0.3s ease;
  flex-direction: row;

  &:hover {
    color: ${({ theme }) => theme.colors.cobartblue};
    cursor: pointer;
  }

  span {
    &:hover {
      color: ${({ theme }) => theme.colors.cobartblue};
    }
  }
`;

export const StyledSideTextGroup = styled(StyledSideContent)`
  display: flex;
  gap: 10px;
  flex-direction: column;

  section {
    display: flex;
    gap: 15px;

    &:hover {
      color: ${({ theme }) => theme.colors.cobartblue};
      cursor: pointer;
    }
  }
`;
