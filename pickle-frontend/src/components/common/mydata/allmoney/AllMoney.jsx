import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./background.css"
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
} from "./AllMoney.style";

export default function AllMoney(props) {
    const settings = {
        className: 'slider variable-width',
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 500,
        infinite: true,
        useCSS: true
        
    };

    return (
        <Container height={props.height} max-width={props.maxWidth}>
            <BankInfo>
                <BankTitle>은행</BankTitle>
                <BalanceContainer>
                    <BalanceRow>
                        <Label>총 잔액</Label>
                        <Amount>356,439,000원</Amount>
                    </BalanceRow>
                    <BalanceRow>
                        <Label>총 출금가능금액</Label>
                        <Amount>356,439,000원</Amount>
                    </BalanceRow>
                </BalanceContainer>
            </BankInfo>
            <BodyContainer>		
            <SliderContainer>
                <Slider {...settings}>
                    <div style={{backgroundColor: "#F1F5FF"}}>
                    <Slide>
                       
                        <SlideHeader>
                            <SlideHeaderName>은행기관</SlideHeaderName>
                            <SlideHeaderKind>보통예금</SlideHeaderKind>
                        </SlideHeader>
                        <ProductName>예금상품명</ProductName>
                        <CurrentBalance>현재잔액 (원)</CurrentBalance>
                        
                    </Slide></div>
                    <div style={{backgroundColor: "#F1F5FF"}}>
                    <Slide>
                       
                        <SlideHeader>
                            <SlideHeaderName>은행기관</SlideHeaderName>
                            <SlideHeaderKind>보통예금</SlideHeaderKind>
                        </SlideHeader>
                        <ProductName>예금상품명</ProductName>
                        <CurrentBalance>현재잔액 (원)</CurrentBalance>
                        
                    </Slide></div>
                    <div style={{backgroundColor: "#F1F5FF"}}>
                    <Slide>
                       
                        <SlideHeader>
                            <SlideHeaderName>은행기관</SlideHeaderName>
                            <SlideHeaderKind>보통예금</SlideHeaderKind>
                        </SlideHeader>
                        <ProductName>예금상품명</ProductName>
                        <CurrentBalance>현재잔액 (원)</CurrentBalance>
                        
                    </Slide></div>
                </Slider>
            </SliderContainer>
            </BodyContainer>		
        </Container>
    );
}
