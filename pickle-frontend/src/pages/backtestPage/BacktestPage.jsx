import React, { useState } from "react";
import { 
    StyledConsultSide, 
    StyledConsultBox, 
    StyledConsultContainer, 
    StyledConsultContentBox, 
    StyledLeftContent,
    HighlightBox,
    LinkWrapper,
    StyledBacktestHeader,
    StyledLeftDiv,
} from "./BacktestPage.style";
import styled from "styled-components";
import { Link } from "react-router-dom";
import profile from "/assets/backtest-profile.svg"
import { Button, InputGroup, Form } from "react-bootstrap";
import Circular from "../../components/common/circular-graph/Circular";
import LegendWithGraph from "../../components/common/legendwith_edit/LegendWithGraph_edit"
import BacktestChart from "../../components/common/backtest/BacktestChart";
import RunBacktestButton from "../../components/common/backtest/RunBacktestButton";

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
                                <div>{item.text}</div>
                            </Link>
                        </LinkWrapper>
                    ))}
                </StyledConsultSide>
                <StyledLeftContent>
                    <StyledBacktestHeader>
                        <section className="user">
                        <img src={profile}></img>
                        {cusName} 고객님
                        </section>
                        <Button variant="light">프리셋 불러오기</Button>
                    </StyledBacktestHeader>
                    <StyledLeftDiv>
                        <section className="Top">
                            <article>
                                <div>전략명 </div>
                                <div>카테고리 </div>
                            </article>
                            {/* <InputGroup className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="투자 금액 입력"
                              aria-label="투자 금액 입력"
                              aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                              적용
                            </Button>
                          </InputGroup>
                            <div style={{position: "relative", width:"200px", margin: "20px"}}>
                            <Circular data={data} top={"20%"} left={"-15%"} width={"290px"} height={"235px"}></Circular>
                            <LegendWithGraph data={data} width={"100%"} left={"80%"} fontSize={"small"}></LegendWithGraph>
                            </div> */}
                        </section>
                        <section className="Bottom">
                        </section>
                        <section className="footer">
                        </section>
                    </StyledLeftDiv>
                </StyledLeftContent>
                <StyledConsultContentBox>
                <BacktestChart width={"90%"}></BacktestChart>
                </StyledConsultContentBox>
            </StyledConsultBox>
        </StyledConsultContainer>
        </>
    );
}
