import React from "react";
import { StyledSideContent, StyledSideDiv, StyledSideText, StyledSideTextGroup } from "./Sidebar.style";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <>
        <StyledSideDiv>
            <StyledSideContent>
                <Link to="/" style={{ textDecoration: 'none' }}>
                <StyledSideText><img src="/assets/side-home.svg" className="icon"></img><span>홈</span></StyledSideText>
                </Link>
                <Link to="/mydata" style={{ textDecoration: 'none' }}>
                <StyledSideText><img src="/assets/side-mydata.svg" className="icon"></img><span>마이 자산데이터</span></StyledSideText>
                </Link>
                <StyledSideTextGroup>
                <Link to="/" style={{ textDecoration: 'none' }}>
                <section><img src="/assets/side-port.svg" className="icon"></img><span style={{color: "#6F6C99"}}>내 포트폴리오</span></section>
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }}>
                <section style={{"font-size": "small", "margin-left": "30px", color: "#6F6C99"}}>전략 관리</section>
                </Link>
                </StyledSideTextGroup>
                <StyledSideTextGroup>
                <Link to="/pblist" style={{ textDecoration: 'none' }}>
                <section><img src="/assets/side-pb.svg" className="icon"></img><span style={{color: "#6F6C99"}}>PB 둘러보기</span></section>
                </Link>
                <section style={{"font-size": "small", "margin-left": "30px"}}>요청 목록</section>
                </StyledSideTextGroup>
                <Link to="/" style={{ textDecoration: 'none' }}>
                <StyledSideText><img src="/assets/side-room.svg" className="icon"></img><span>실시간 상담룸</span></StyledSideText>
                </Link>

            </StyledSideContent>
        </StyledSideDiv>
        </>
    )
};