import React from "react";
import { StyeldWalletContainer, StyledIconAndText, StyledWalletText, StyledWalletGroup, StyledWalletTextGroup} from "./WalletCard.style";


export default function WalletCard(props) {
    //금액 String 원화 처리
    const formatCurrency = (amount) => {
        return amount.toLocaleString() + '원';
      };

    const texts = props.texts
    const formattedAmounts = props.amounts.map(amount => formatCurrency(amount));
      
    return (
        <>
        <StyeldWalletContainer width={props.width} height={props.height}>
            <StyledIconAndText>
                <img src="/assets/mywallet.png"></img>
                <StyledWalletText>내 자산</StyledWalletText>
            </StyledIconAndText>
            <StyledWalletTextGroup>
                <span style={{fontWeight: "300"}}>{texts[0]}</span>
                <span style={{fontSize:"1.5rem"}}>{formattedAmounts[0]}</span>
            </StyledWalletTextGroup>
            <StyledWalletGroup>
                <section><span style={{fontWeight: "300"}}>{texts[1]}</span><br />
                {formattedAmounts[1]}</section>
                <section><span style={{fontWeight: "300"}}>{texts[2]}</span><br />
                {formattedAmounts[2]}</section>
            </StyledWalletGroup>

        </StyeldWalletContainer>
        </>
    )
};