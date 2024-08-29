import React from "react";
import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import AllMoney from "../../components/common/mydata/allmoney/AllMoney";
import WalletCard from "../../components/common/wallet-card/WalletCard";
import { StyledS1Text, StyledHomeContainer, StyledHomeContent, StyledHomeMainContent, StyledHeadText, StyledHomeSection1, StyledContentBlock } from "./HomePage.style";

export default function HomePage(){    
    
    //TODO
    const loginUserName = "홍길동";
    const consultPB = "윤재욱";

    const now = new Date();
    const consultDate = new Date(); //!! 상담일자로 변경해야 함
    consultDate.setDate(consultDate.getDate()-2);
    const Dday = Math.floor((now - consultDate) / (1000 * 60 * 60 * 24));
    
    const dateString = consultDate.toLocaleDateString();
    const timeString = consultDate.toLocaleTimeString();
    const [consultYear, consultMonth, consultDay] = dateString.split('.');
    const [consultHour, consultMin, consultSec] = timeString.split(':');


    //내 자산 지갑
    const walletTexts = ["내 포트폴리오 자산", "총 자산", "투자 여유 금액"]
    const walletAmounts = [7532220, 254032350, 12321200]

    return (
        <StyledHomeContainer>
            <Header />
            <StyledHomeMainContent>
                    <Sidebar />
                <StyledHomeContent>

                    <StyledHeadText>
                        {loginUserName.slice(1)}님, 환영합니다.
                    </StyledHeadText>
                    

                    {/* section 1 */}
                    <StyledHomeSection1>
                        <StyledContentBlock>
                            <StyledS1Text>
                                <img src="/assets/home-bell.svg"></img>
                                <span><p>예정된 상담 일정</p><hr></hr></span>
                                <p style={{fontWeight:"700"}}>D-{Dday}</p>
                                <section>
                                    <p>{consultYear}년 {consultMonth}월 {consultDay}일</p>
                                    <p>{consultHour}시 {consultMin}분</p>
                                    <p>{consultPB}PB</p>
                                </section>
                                <img src="/assets/home-next.svg"></img>
                            </StyledS1Text>
                        </StyledContentBlock>
                    </StyledHomeSection1>


                    <WalletCard texts={walletTexts} amounts={walletAmounts} />
                </StyledHomeContent>
            </StyledHomeMainContent>
        </StyledHomeContainer>
    )
};