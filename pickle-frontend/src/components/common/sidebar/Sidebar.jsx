import React from "react";
import { StyledSideContent, StyledSideDiv, StyledSideText, StyledSideTextGroup } from "./Sidebar.style";

export default function Sidebar() {
    return (
        <>
        <StyledSideDiv>
            <StyledSideContent>
                <StyledSideText><img src="/assets/side-home.svg" className="icon"></img><span>홈</span></StyledSideText>
                <StyledSideText><img src="/assets/side-mydata.svg" className="icon"></img><span>마이 자산데이터</span></StyledSideText>
                <StyledSideTextGroup>
                <section><img src="/assets/side-port.svg" className="icon"></img><span>내 포트폴리오</span></section>
                
                <section style={{"font-size": "small", "margin-left": "30px"}}>전략 관리</section>
                </StyledSideTextGroup>
                <StyledSideTextGroup>
                <section><img src="/assets/side-pb.svg" className="icon"></img><span>PB 둘러보기</span></section>
                <section style={{"font-size": "small", "margin-left": "30px"}}>요청 목록</section>
                </StyledSideTextGroup>
                <StyledSideText><img src="/assets/side-room.svg" className="icon"></img><span>실시간 상담룸</span></StyledSideText>
            </StyledSideContent>
        </StyledSideDiv>
        </>
    )
};