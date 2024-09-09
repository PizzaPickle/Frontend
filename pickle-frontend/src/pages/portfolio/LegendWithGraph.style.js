import styled from "styled-components";

export const LegendWithGraphDiv = styled.div`
  width: ${({ width }) => width || '80%'};
  height: ${({ height }) => height || '100%'};
  /* display: grid; */
  /* grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(2, 1fr); */
  position: absolute;
  top: ${(props) => props.top || '0%'};
  left: ${(props) => props.left || '0%'};
  background-color: white;
  padding: 20px;
  border-radius: 20px;
`;

export const CircularDiv = styled.div`
  /* grid-area: 1 / 1 / 3 / 6; */
  /* transform: translateY(10%); */
`;

export const LegendDiv = styled.div`
  /* grid-area: 1 / 6 / 3 / 11; */
  /* width: 100%; */
  display: flex;
  align-items: center;
`;

export const LegendListDiv = styled.div`
  width: 100%;
  font-size: ${(props) => props.fontSize || 'medium'};
`
export const MenuGroup =styled.div`
width: 680px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
`
export const Menu= styled.div`
  font-size: 12px;
  color: #636566;
  
`
export const Line=styled.hr`
  background-color: #ECECED;
  border: none; 
  height: 1.2px;
  margin-bottom: 10px;

`