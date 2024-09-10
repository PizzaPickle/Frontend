import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  StyledLeftContent,
  StyledConsultContentBox,
  LinkWrapper,
  HighlightBox,
  StyledConsultContainer,
  StyledConsultBox,
  StyledConsultSide,
} from "./BacktestPage.style";

export default function CheckMyData() {
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
              { text: "전략 생성", link: "/consult/backtest" },
              { text: "마이데이터", link: "/consult/backtest/mydata" },
            ].map((item, index) => (
              <LinkWrapper key={index} onClick={() => handleClick(index)}>
                <HighlightBox visible={selectedIndex === index} />
                <Link
                  to={item.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div>{item.text}</div>
                </Link>
              </LinkWrapper>
            ))}
          </StyledConsultSide>
          <StyledLeftContent></StyledLeftContent>
          <StyledConsultContentBox></StyledConsultContentBox>
        </StyledConsultBox>
      </StyledConsultContainer>
    </>
  );
}
