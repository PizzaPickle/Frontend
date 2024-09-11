import React from 'react';
import {
    StyledSideContent,
    StyledSideDiv,
    StyledSideText,
    StyledSideTextGroup,
} from './Sidebar.style';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <>
            <StyledSideDiv>
                <StyledSideContent>
                    <Link to="/homepage" style={{ textDecoration: 'none' }}>
                        <StyledSideText>
                            <img
                                src="/assets/side-home.svg"
                                className="icon"
                                alt="홈 아이콘"
                            />
                            <span>홈</span>
                        </StyledSideText>
                    </Link>
                    <Link to="/mydata" style={{ textDecoration: 'none' }}>
                        <StyledSideText>
                            <img
                                src="/assets/side-mydata.svg"
                                className="icon"
                                alt="마이 자산데이터 아이콘"
                            />
                            <span>마이 자산데이터</span>
                        </StyledSideText>
                    </Link>
                    <StyledSideTextGroup>
                        <Link
                            to="/portfolio"
                            style={{ textDecoration: 'none' }}
                        >
                            <StyledSideText>
                                <img
                                    src="/assets/side-port.svg"
                                    className="icon"
                                    alt="내 포트폴리오 아이콘"
                                />
                                <span>내 포트폴리오</span>
                            </StyledSideText>
                        </Link>
                        <Link
                            to="/mystrategy"
                            style={{ textDecoration: 'none' }}
                        >
                            <StyledSideText
                                style={{
                                    fontSize: 'small',
                                    marginLeft: '30px',
                                }}
                            >
                                전략 관리
                            </StyledSideText>
                        </Link>
                    </StyledSideTextGroup>
                    <StyledSideTextGroup>
                        <Link to="/pblist" style={{ textDecoration: 'none' }}>
                            <StyledSideText>
                                <img
                                    src="/assets/side-pb.svg"
                                    className="icon"
                                    alt="PB 둘러보기 아이콘"
                                />
                                <span>PB 둘러보기</span>
                            </StyledSideText>
                        </Link>
                        <Link
                            to="/myrequest"
                            style={{ textDecoration: 'none' }}
                        >
                            <StyledSideText
                                style={{
                                    fontSize: 'small',
                                    marginLeft: '30px',
                                }}
                            >
                                요청 목록
                            </StyledSideText>
                        </Link>
                    </StyledSideTextGroup>
                    <Link to="/myconsulting" style={{ textDecoration: 'none' }}>
                        <StyledSideText>
                            <img
                                src="/assets/side-room.svg"
                                className="icon"
                                alt="실시간 상담룸 아이콘"
                            />
                            <span>실시간 상담룸</span>
                        </StyledSideText>
                    </Link>
                </StyledSideContent>
            </StyledSideDiv>
        </>
    );
}
