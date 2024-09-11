import { Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";

export const BalanceInput = styled.input`
  border: 1px solid lightgray;
  border-radius: 5px;
  min-width: 160px;
  background: transparent;
  outline: none;
  height: 40px;
`;

export const StyledInputGroup = styled(InputGroup)`
  width: 180px;
  height: 40px;
  &:focus {
    border-color: #0056b3;
    box-shadow: none;
  }
`;

export const StyledFormControl = styled(Form.Control)`
  padding: 10px;
  border: 2px solid #e8ebf1;
  height: 40px;
`;

export const StyledButton = styled.button`
  width: 50px;
  height: 40px;
  border: solid 1.5px #e8ebf1;
  border-radius: 8px;
  font-size: small;
  color: white;
  background-color: #6f6c99;
  &:hover {
    background-color: #02004c;
  }
`;
