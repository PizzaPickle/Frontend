import styled, { css, keyframes } from "styled-components";
import { StyeldWalletContainer } from "../wallet-card/WalletCard.style";

export const BoxContainer = styled.div`
  background-color: #edf1fb;
  width: 1200px;
  height: auto;
  padding: 30px;
  border-radius: 10px;
`;

export const Header = styled.div``;
export const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: center;
`;
export const Content = styled.div`
  font-size: 14px;
  color: #636566;
`;
export const Line = styled.hr`
  color: #ccc;
`;
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  /* margin-left: 60px; */
`;
export const StockContent = styled.span`
  font-size: 15px;
  color: #5a5a5a;
  flex: 1;
  text-align: center;
`;
export const StockContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  flex: 1;
  flex-wrap: wrap;
`;

export const Stock_Content = styled.span`
  font-size: 15px;
  color: ${(props) => (props.applyClicked ? "#5a5a5a" : "#d3d3d3")};
  flex: 1;
  text-align: center;
`;
