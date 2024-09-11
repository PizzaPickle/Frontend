import React from "react";
import { StyledSideContent, StyledSideDiv, StyledSideText, StyledSideTextGroup } from "./PbSidebar.style";
import { Link } from "react-router-dom";

export default function PbSidebar() {
    return (
        <>
            <StyledSideDiv>
                <StyledSideContent>
                    <Link to="/pb/customer-request" style={{ textDecoration: 'none' }}>
                        <StyledSideText>
                            <img src="/assets/side-home.svg" className="icon" alt="홈 아이콘" />
                            <span>고객 요청관리</span>
                        </StyledSideText>
                    </Link>
                    {/* <StyledSideTextGroup>
                        <Link to="/pb" style={{ textDecoration: 'none' }}>
                            <StyledSideText>
                                <img src="/assets/side-port.svg" className="icon" alt="내 포트폴리오 아이콘" />
                                <span>프리셋 생성</span>
                            </StyledSideText>
                        </Link>
                    </StyledSideTextGroup> */}
                    <Link to="/pb/consulting" style={{ textDecoration: 'none' }}>
                        <StyledSideText>
                            <img src="/assets/side-room.svg" className="icon" alt="실시간 상담룸 아이콘" />
                            <span>실시간 상담룸</span>
                        </StyledSideText>
                    </Link>
                </StyledSideContent>
            </StyledSideDiv>
        </>
    );
}