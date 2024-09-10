import styled from "styled-components";

export const SearchContainer = styled.div`
  padding: 0 10%;
  position: relative;
  height: ${({ height }) => height || "70vh"};
  padding-top: ${({ padding }) => padding || "0"};
`;

export const SearchInput = styled.input`
  height: 30px;
  margin: 0;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  outline: none;
  width: 100%;
  padding-left: 25px;
`;

export const SearchText = styled.p`
  margin: 0;
  font-weight: normal;
  color: #636566;
  font-size: small;
  padding-bottom: 10px;
`;

export const Horizon = styled.hr`
  margin: 0;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  font-size: x-small;
  padding: 0.5rem 0 1rem 0;
  position: relative;
`;

export const FilterTag = styled.div`
  height: 30px;
  background-color: ${({ background }) => background};
  border-radius: 20px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const DropDownContainer = styled.div`
  width: 230px;
  height: 230px;
  background-color: white;
  border-radius: 20px;
  position: absolute;
  top: 45px;
  z-index: 100;
  box-shadow: 0px 0px 6px 0px #ced4da;
  left: ${({ left }) => left || ""};
  padding-top: 5px;
`;

export const RadioContainer = styled.div``;

export const RadioLabel = styled.label`
  display: flex;
  margin: 10px 0;
  gap: 10px;
  /* margin: 5px 0; */
  font-size: small;
`;

export const RadioInput = styled.input`
  /* margin-right: 10px; */
`;

export const ThemeListContainer = styled.div`
  width: 90%;
  height: 55%;
  margin: 0 auto;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const ThemeTag = styled.div`
  background-color: rgba(2, 32, 71, 0.05);
  padding: 3px 8px;
  display: flex;
  align-items: center;
  border-radius: 11px;
  cursor: pointer;
  max-height: 24px;
  &:hover {
    background-color: rgba(0, 27, 55, 0.1);
  }
`;

export const ThemeClear = styled.button`
  position: absolute;
  border: none;
  top: 12px;
  right: 15px;
  border-radius: 9px;
  &:hover {
    background-color: #ffb6b6;
  }
`;

export const ItemsContainer = styled.div`
  height: 80%;
  overflow: scroll;
  overflow-x: hidden;
  margin-top: 10px;
  padding: 0 5px;
`;

export const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  &:hover{
    background-color: #d3d3d363;
    border-radius: 10px;
  }
`;

export const ProductImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

export const ProdcutText = styled.p`
  color: gray;
  font-size: small;
`;

export const ProdcutTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProdcutTextContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;