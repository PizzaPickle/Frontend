import styled from "styled-components";

export const BackgroundBar = styled.div`
  width: 80%;
  height: 5px;
  border-radius: 5px;
  background-color: #dfdfdf;
  margin: 0 auto;
  position: relative;
`;

export const GaugeBar = styled.div`
  width: ${({ width }) => width};
  height: 5px;
  border-radius: 5px;
  background-color: #0046ff;
`;

export const PercentText = styled.p`
  margin: 0;
  font-size: x-small;
  color: gray;
  position: absolute;
  right: 0;
  top: 10px;
`;

export const PercentInput = styled.input`
  background: transparent;
  border: none;
  color: #636566;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20%;
  font-size: x-small;
  margin: 0;
  color: gray;
  outline: none;
  text-align: right;
`;

export const PercentContainer = styled.div`
  display: flex;
`;