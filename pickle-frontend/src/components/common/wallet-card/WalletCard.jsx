import React from "react";
import { StyeldWalletContainer, StyledIconAndText, StyledWalletText, StyledWalletGroup, StyledWalletTextGroup} from "./WalletCard.style";


export default function WalletCard(props) {




    //금액 String 원화 처리
    const formatCurrency = (amount) => {
        return amount.toLocaleString() + '원';
      };

    const texts = props.texts;
      
    return (
        <>
        <StyeldWalletContainer width={props.width} height={props.height}>
            <StyledIconAndText>
                <img src="/assets/mywallet.png"></img>
                <StyledWalletText>내 계좌</StyledWalletText>
                {props.amounts[0]}
            </StyledIconAndText>
            <StyledWalletTextGroup>
                <span style={{fontWeight: "300"}}>{texts[0]}</span>
                <span style={{fontSize:"1.5rem"}}>{formatCurrency(props.amounts[1])}</span>
            </StyledWalletTextGroup>
            <StyledWalletGroup>
                <section><span style={{fontWeight: "300"}}>{texts[1]}</span><br />
                {formatCurrency(props.amounts[2])}</section>
                <section><span style={{fontWeight: "300"}}>{texts[2]}</span><br />
                {formatCurrency(props.amounts[3])}</section>
            </StyledWalletGroup>

        </StyeldWalletContainer>
        </>
    )
};