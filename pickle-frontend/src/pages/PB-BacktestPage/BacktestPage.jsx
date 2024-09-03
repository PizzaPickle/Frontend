import React, { useState } from "react";
import { 
    StyledConsultSide, 
    StyledConsultBox, 
    StyledConsultContainer, 
    StyledConsultContentBox, 
    StyledLeftContent,
    HighlightBox,
    LinkWrapper,
    StyledBacktestHeader
} from "./BacktestPage.style";
import styled from "styled-components";
import { Link } from "react-router-dom";
import profile from "/assets/backtest-profile.svg"
import { Button } from "bootstrap";

export default function BacktestPage(){  
    const [selectedIndex, setSelectedIndex] = useState(null);
    const handleClick = (index) => {
        setSelectedIndex(index === selectedIndex ? null : index);
    };
    // TODO 상담방에 입장할 고객 이름
    const cusName = "박찬란";

    return (
        <>
        <StyledConsultContainer>
            <StyledConsultBox>
                <StyledConsultSide>
                    {[
                        { text: "상담 요청서", link: "/consult/backtest" },
                        { text: "기존 전략", link: "/consult/backtest/portfolio" },
                        { text: "전략 생성", link: "/consult/backtest/strategy" }
                    ].map((item, index) => (
                        <LinkWrapper key={index} onClick={() => handleClick(index)}>
                            <HighlightBox visible={selectedIndex === index} />
                            <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <p>{item.text}</p>
                            </Link>
                        </LinkWrapper>
                    ))}
                </StyledConsultSide>
                <StyledLeftContent>
                    <StyledBacktestHeader>
                        <img src={profile}></img>
                        {cusName} 고객님
                        <Button>프리셋 불러오기</Button>
                    </StyledBacktestHeader>
                </StyledLeftContent>
                <StyledConsultContentBox>
                </StyledConsultContentBox>
            </StyledConsultBox>
        </StyledConsultContainer>
        </>
    );
}
