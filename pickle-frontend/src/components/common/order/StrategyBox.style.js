import styled, { css, keyframes } from "styled-components";
import { StyeldWalletContainer } from "../wallet-card/WalletCard.style";

export const BoxContainer=styled.div`
    background-color: #EDF1FB;
    width: 1200px;
    height: auto;
    padding: 30px;
    border-radius: 10px;

`


export const Header=styled.div`
   
`
export const Title=styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`
export const Content=styled.div`
    font-size: 14px;
    color: #636566;

`
export const Line=styled.hr`
`
export const Body=styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%
   
    /* margin-left: 60px; */

`
export const StockContent=styled.span`
    font-size:15px;
    color: #5A5A5A;
    flex: 1;
    text-align: center;
    
    
    
    
`
export const StockContainer=styled.span`
    display: flex;
    justify-content: center;
    align-items: center; 
    text-align: center;
    
    
    flex: 1;
    flex-wrap: wrap;

    

`