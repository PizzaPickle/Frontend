import React from "react";
import Sidebar from "../../components/common/sidebar/Sidebar";
import Header from "../../components/common/header/Header";
import { StyledHomeContainer, StyledHomeMainContent, StyledHomeContent, StyledHomeSection, StyledHead2Text, StyledContentFlex, StyledContentBlock } from "../homePage/HomePage.style";
import StrategyList from "../../components/common/strategy/list/StrategyList";
import StrategyBox from "../../components/common/strategy/box/StrategyBox";

export default function MyStrategy(){

    const data = {
        "code": 1,
        "message": "요청서 조회성공",
        "data": {
          "strategyList": [
            {
                "name": "전략이름",
              "pbName": "PB이름",
              "pbBranchOffice": "PB지점 이름",
              "createdAt": "생성일",
              "categoryComposition": [
                  "국내 주식",
                  "해외 주식",
                  "ETF"
              ]
            },
            {
                "name": "전략이름",
              "pbName": "PB이름",
              "pbBranchOffice": "PB지점 이름",
              "createdAt": "생성일",
              "categoryComposition": [
                  "국내 주식",
                  "해외 주식",
                  "ETF"
              ]
            }
          ]
        }
      }

    return (
        <>
        <StyledHomeContainer>
            <Header />
            <StyledHomeMainContent>
                    <Sidebar />
                <StyledHomeContent>

                    {/* section 1 */}
                    <StyledHomeSection> 
                    <StyledHead2Text>
                        나의 전략 목록
                    </StyledHead2Text>
                    <StyledContentBlock style={{width:"440px"}}>
                    <div style={{padding:"20px"}}>

                        <StrategyList>

                        </StrategyList>
                        <StrategyBox></StrategyBox>
                    </div>
                    </StyledContentBlock>
                    </StyledHomeSection>
                    </StyledHomeContent>
                    </StyledHomeMainContent>
                    </StyledHomeContainer>
        </>
    )
}