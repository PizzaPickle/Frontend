import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
 
    
} from "./AllMoney.style";

export default function AllMoney() {
    const settings = {
        className: 'slider variable-width',
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 500,
        infinite: true,
        dots: true,
    };

    return (
        <Container>
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
            <SliderContainer>
                <Slider {...settings}>
                    <Slide>
                        <SlideHeader>
                            <SlideHeaderName>은행기관</SlideHeaderName>
                            <SlideHeaderKind>보통예금</SlideHeaderKind>
                        </SlideHeader>
                        <ProductName>예금상품명</ProductName>
                        <CurrentBalance>현재잔액 (원)</CurrentBalance>
                    </Slide>
                    <Slide>
                        <SlideHeader>
                            <SlideHeaderName>은행기관</SlideHeaderName>
                            <SlideHeaderKind>보통예금</SlideHeaderKind>
                        </SlideHeader>
                        <ProductName>예금상품명</ProductName>
                        <CurrentBalance>현재잔액 (원)</CurrentBalance>
                    </Slide>
                    <Slide>
                        <SlideHeader>
                            <SlideHeaderName>은행기관</SlideHeaderName>
                            <SlideHeaderKind>보통예금</SlideHeaderKind>
                        </SlideHeader>
                        <ProductName>예금상품명</ProductName>
                        <CurrentBalance>현재잔액 (원)</CurrentBalance>
                    </Slide>
                </Slider>
            </SliderContainer>
        </Container>
    );
}
