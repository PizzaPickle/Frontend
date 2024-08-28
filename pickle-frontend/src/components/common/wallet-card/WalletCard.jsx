import React from "react";
import { StyeldWalletContainer, StyledIconAndText, StyledWalletText, StyledWalletGroup, StyledWalletTextGroup} from "./WalletCard.style";


export default function WalletCard(props) {
    //금액 String 원화 처리
    const formatCurrency = (amount) => {
        return amount.toLocaleString() + '원';
      };

    const amount1 = formatCurrency(props.data1);
    const amount2 = formatCurrency(props.data2);
    const amount3 = formatCurrency(props.data3);
    
      
    return (
        <>
        <StyeldWalletContainer>
            <StyledIconAndText>
                <img src="/assets/mywallet.png"></img>
                <StyledWalletText>내 자산</StyledWalletText>
            </StyledIconAndText>
            <StyledWalletTextGroup>
                <span style={{fontWeight: "300"}}>{props.text1}</span>
                <span style={{fontSize:"1.5rem"}}>{amount1}</span>
            </StyledWalletTextGroup>
            <StyledWalletGroup>
                <section><span style={{fontWeight: "300"}}>{props.text2}</span><br />
                {amount2}</section>
                <section><span style={{fontWeight: "300"}}>{props.text3}</span><br />
                {amount3}</section>
            </StyledWalletGroup>

        </StyeldWalletContainer>
        </>
    )
};