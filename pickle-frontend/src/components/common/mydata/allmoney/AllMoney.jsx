import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./background.css"
import {
    Container,
    // BankInfo,
    // BankTitle,
    // BalanceContainer,
    // BalanceRow,
    // Label,
    // Amount,
    Slide,
    SliderContainer,
    ProductName,
    SlideHeader,
    SlideHeaderName,
    SlideHeaderKind,
    CurrentBalance,
    BodyContainer
} from "./AllMoney.style";

export default function AllMoney(props) {
    const settings = {
        className: 'slider variable-width',
        slidesToShow: props.showNum,
        slidesToScroll: 1,
        speed: 500,
        infinite: true,
        useCSS: true
        
    };

    return (
        <Container height={props.height} maxWidth={props.maxWidth} padding={props.padding}>
        {/* <BankInfo>
            <BankTitle>{props.bankTitle}</BankTitle>
            <BalanceContainer>
                {props.balanceInfo.map((balance, index) => (
                    <BalanceRow key={index}>
                        <Label>{balance.label}</Label>
                        <Amount>{balance.amount}</Amount>
                    </BalanceRow>
                ))}
            </BalanceContainer>
        </BankInfo> */}
        <BodyContainer>		
            <SliderContainer listWidth={props.listWidth}>
                <Slider {...settings}>
                    {props.slides.map((slide, index) => (
                        <div key={index}>
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
                </Slider>
            </SliderContainer>
        </BodyContainer>		
    </Container>
    );
}
