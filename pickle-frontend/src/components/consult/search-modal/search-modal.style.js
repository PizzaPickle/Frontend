import styled from "styled-components";

export const SearchContainer = styled.div`
  padding: 0 10%;
  position: relative;
  height: 70vh;
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
