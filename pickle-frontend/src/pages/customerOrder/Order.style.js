import styled, { css, keyframes } from "styled-components";
import {Button, InputGroup, Form} from 'react-bootstrap';
import { MdDensitySmall, MdKeyboardDoubleArrowLeft } from "react-icons/md";
export const StyledHomeMainContent = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: row;
    overflow-y: hidden;
    
`
export const ArrowIcon=styled(MdKeyboardDoubleArrowLeft)`
    width: 50px;
    height: auto;
    cursor: pointer;
    color: #6F6C99;
    
`
export const StyledInputGroup = styled(InputGroup)`
  width: 400px;
  &:focus {
    border-color: #0056b3;
    box-shadow: none;
  }
  
`;

export const StyledFormControl = styled(Form.Control)`
  padding: 10px;
  border: 2px solid #E8EBF1;
 
`;

export const StyledButton = styled.button`
    width: 80px;
    height: 50px;
    border: solid 1.5px #E8EBF1;
    border-radius: 8px;

    color: white;
    background-color: #6F6C99;
   &:hover {
    background-color: #02004C;
  }
  

`;
export const SecondHeader=styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 100px;
   


`
export const Previous=styled.div`
    display: flex;
    flex-direction: row;
    gap:3px;
    align-items: center;
    cursor: pointer;
    &:hover {
    transform: scale(1.1); 
    transition: transform 0.2s ease, color 0.5s ease; 
  }
`
export const StrategyName=styled.div`
    font-size: 22px;
    color: #020050;
    font-weight: 450;
    

`
export const CategoryName=styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 500;
  color:#020050;
`
export const Category=styled.div`
`
export const StyledContent=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`
export const OrderButton=styled.button`
  
`
