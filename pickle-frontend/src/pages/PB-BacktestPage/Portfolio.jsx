import React, {useState} from "react";
import { Link } from "react-router-dom";
import { StyledLeftContent, StyledConsultContentBox, LinkWrapper, HighlightBox, StyledConsultContainer, StyledConsultBox, StyledConsultSide } from "./BacktestPage.style";

export default function Portfolio(){
    const [selectedIndex, setSelectedIndex] = useState(null);
    const handleClick = (index) => {
        setSelectedIndex(index === selectedIndex ? null : index);
    };

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
            </StyledLeftContent>
            <StyledConsultContentBox>
            </StyledConsultContentBox>
    </StyledConsultBox>
    </StyledConsultContainer>
    </>

    )
    
}