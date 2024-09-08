import React from "react";
import {
    Container,
    BankInfo,
    BankTitle,
    BalanceContainer,
    BalanceRow,
    Label,
    Amount,
    Slide,
    SliderContainer,
    ProductName,
    SlideHeader,
    SlideHeaderName,
    SlideHeaderKind,
    CurrentBalance,
    BodyContainer
} from "../../components/common/mydata/allmoney/AllMoney.style";

export default function MydataScreen(props) {
    return (
        <div>
            <BankInfo infoVisible={props.infoVisible} style={{marginLeft:"20px", color:"#202224"}}>
                <BankTitle style={{color: "#202224"}}>{props.bankTitle}</BankTitle>
                <BalanceContainer style={{ "display": "flex", "flexDirection": "row" }}>
                    {props.balanceInfo.map((balance, index) => (
                        <BalanceRow key={index}>
                            <Label>{balance.label}</Label>
                            <Amount>{balance.amount.toLocaleString()}</Amount>
                        </BalanceRow>
                    ))}
                </BalanceContainer>
            </BankInfo>
            <BodyContainer>
                <SliderContainer listWidth={props.listWidth}>
                    {/* Slick Slider를 제거하고 기본 div로 슬라이드 표시 */}
                    <div style={{ display: 'flex', padding: '10px', flexWrap:"wrap" }}>
                        {props.slides.map((slide, index) => (
                            <div key={index} style={{ flex: '0 0 auto', margin: '10px' , flexWrap:"wrap"}}>
                                <Slide cardWidth={props.cardWidth}>
                                    <SlideHeader>
                                        <SlideHeaderName>{slide.bankName}</SlideHeaderName>
                                        <SlideHeaderKind>{slide.accountType}</SlideHeaderKind>
                                    </SlideHeader>
                                    <ProductName display={props.secondTextNo}>{slide.productName}</ProductName>
                                    <CurrentBalance lastTextSize={props.lastTextSize} lastTextColor={props.lastTextColor}>{slide.currentBalance}</CurrentBalance>
                                </Slide>
                            </div>
                        ))}
                    </div>
                </SliderContainer>
            </BodyContainer>
        </div>
    );
}
