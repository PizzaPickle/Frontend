import styled, { css } from "styled-components";

export const StyledGraphDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  height: 35vh;
  background-color: white;
  border-radius: 7px;
  border: 1px solid rgba(201, 201, 201, 0.5);
  width: ${(props) => props.width || "800px"};
  margin-bottom: 10px;

  section {
    display: flex;
    justify-content: space-around;
    gap: 10px;
    font-size: x-small;

    p {
      font-size: smaller;
      border-radius: 8px;
      display: flex;
      align-items: center;
    }
  }
`;

export const StyledColorLegend = styled.div`
  section {
    background-color: ${(props) => props.color || "800px"};
  }
`;
