import styled, { css, keyframes } from "styled-components";

export const StyledConsultContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.navy};
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`;

export const StyledConsultBox = styled.div`
  width: 90%;
  height: 97%;
  border-radius: 20x;
  display: flex;
`;

export const StyledConsultSide = styled.div`
  background-color: rgba(255, 255, 255, 0.71);
  flex: 1;
  border-radius: 20px 0px 0px 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* font-size: smaller; */
  div {
    margin-left: 0.7rem;
    margin-right: 0.7rem;
    color: ${({ theme }) => theme.colors.navy};
  }
`;

export const HighlightBox = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  width: 3px;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1; /* 텍스트보다 뒤에 위치 */
  border-radius: 4px; /* 모서리 둥글게 */
`;

export const LinkWrapper = styled.div`
  position: relative;
  margin: 10px 0;
  cursor: pointer;
  padding: 10px; /* 클릭 영역을 넓히기 위해 padding 추가 */
  &:hover {
    border-radius: 20px;
    background-color: rgba(56, 63, 101, 0.08); /* 호버 시 배경색 */
  }
`;

export const StyledLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  border-right: solid 1px lightgrey;
  background-color: white;
`;

export const StyledConsultContentBox = styled.div`
  background-color: white;
  border-radius: 0px 20px 20px 0px;
  flex: 5;
  padding: 20px;
`;

export const StyledBacktestHeader = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dashboard_gray};
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line_gray};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.deep_gray};

  .user {
    flex: 2;
    margin-left: 20px;
    display: flex;
    gap: 10px;
  }

  Button {
    margin-right: 20px;
    color: ${({ theme }) => theme.colors.deep_gray};
    border: 1px solid ${({ theme }) => theme.colors.line_gray};
  }
`;

export const StyledLeftDiv = styled.div`
  display: flex;
  flex: 9;
  flex-direction: column;
  height: 100%;

  .Top {
    flex: 3;
    border-bottom: 1px solid ${({ theme }) => theme.colors.line_gray};
  }

  .Bottom {
    flex: 5;
  }
`;

export const LegendDiv = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;

export const LegendListDiv = styled.div`
  width: 100%;
  font-size: ${(props) => props.fontSize || "medium"};
`;

export const GraphWithLegendContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  margin: 20px;
`;

export const StockTableContainer = styled.div`
  font-size: small;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ColorCircle = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color || "none"};
  border-radius: 50%;
`;

export const CategoryInfo = styled.p`
  margin: 0;
`;

export const Bolder = styled.span`
  font-weight: 600;
`;

export const CategoryInfoContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: larger;
  padding: 1rem 0;
`;

export const AlertContainer = styled.div`
  background-color: #00000010;
  position: absolute;
  left: 0;
  border-radius: 10px;
  font-size: small;
  padding: 0.5rem 1rem;
  transition: opacity 0.3s ease-in-out;
  color: #ff000080;
`;

export const ProductInput = styled.input`
  height: 30px;
  margin: 0;
  font-size: small;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border: 1px solid #ced4da;
  outline: none;
  padding-left: 4px;
  width: 150px;
`;

export const ProductInputButton = styled.button`
  border: none;
  background-color: #b6b6b6;
  height: 30px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 0 10px;
`;

export const CreateStrategyBtn = styled.button`
  width: 100%;
  color: #636566;
  font-weight: 400;
  border-top: 1px solid #80808085;
  border-bottom: none;
  border-left: none;
  border-right: none;
  position: absolute;
  bottom: 0;
  height: 50px;
`;
