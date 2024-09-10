import styled from "styled-components";

export const StyledGraphDiv = styled.div`
  position: absolute;
  top: ${(props) => props.top || '0%'};
  left: ${(props) => props.left || '0%'};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  transform: translate(-12%, -10%);

/* 
  div {
    transform: scale(1.2);
  } */
`;
