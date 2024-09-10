import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StyledHomeContainer, StyledHomeMainContent, StyledHomeContent } from "../../homePage/HomePage.style";
import Sidebar from "../../../components/common/sidebar/Sidebar";
import Header from "../../../components/common/header/Header";
import { StyledContentBlock, StyledHeadText } from "../../RealtimeConsulting/RealtimeConsulting.style";
import { StyledRequestButton } from "./CustomerRequest.style";
import { StyledRequestBox } from "./DetailRequest.style";

export default function DetailRequest() {
    const { token } = useSelector((state) => state.pbuser); 
    const [data, setData] = useState([]);

    const convertGender = (int) => {
        return int === 0 ? "남자" : "여자";
    };

    const [activeButton, setActiveButton] = useState(1);
    const [loading, setLoading] = useState(true);
    
     // 쿼리 파라미터에서 id 추출
    const { id } = useParams();

    const fetchData= async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/pickle-common/consulting/pb/request-letters/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 포함한 헤더
            },
          }); // 서버로 요청
          const result = await response.json();
          console.log(result.data)
          setData(result.data)
          return result.data;
        } catch (error) {
          console.error("Error fetching request letters:", error);
          throw error; // 오류 발생 시 오류를 던짐
        } finally {
            setLoading(false);
        }
      };

      useEffect(() => {
        fetchData();
    }, [token]);




    const handleReqButton = (buttonIndex) => {
        setActiveButton(buttonIndex);
        console.log(activeButton)
      };

    const handleMydataButton = (buttonIndex) => {
    setActiveButton(buttonIndex);
    // 마이데이터 이미지 fetch 요청
    console.log(activeButton)
    }

    const householdOptions = ['외벌이','맞벌이','은퇴함','자영업'];
    const dependentOptions = ['있음', '없음'];
    const investImpOptions = ['손해를 줄이는 것','수익을 늘리는 것','둘 사이 어딘가'];
    const investLossOptions = ['전부 판다','일부를 판다','그대로 보유할 것이다','오히려 더 투자한다'];


    return (
        <>
        <StyledHomeContainer>
            <Header/>
            <StyledHomeMainContent>                
                <Sidebar/>
                <StyledHomeContent style={{ margin: "20px" }}>
                    <StyledHeadText>
                        {data.customerName} 고객님의 예약 요청건
                    </StyledHeadText>

                    <StyledContentBlock style={{flexDirection:"column",marginTop:"30px",width:"1200px"}}>
                    <StyledRequestButton>
                        <button onClick={() => handleReqButton(1)}
                            className={activeButton === 1 ? 'active' : ''}>
                            요청서
                        </button>
                        <button onClick={() => handleMydataButton(2)}
                            className={activeButton === 2 ? 'active' : ''}>
                            고객 자산
                        </button>
                    </StyledRequestButton>

                     {/* 요청서 div */}
                     {loading ? (
                    <p>Loading ..</p>
                ) : (

                     data &&  activeButton === 1 && (
                            <StyledRequestBox>
                                
                                <section>
                                <img src="/assets/customer-icon.svg"></img>
                                <div id="customer-section">
                                <p>{data.customerName} 고객</p>
                                <p>{convertGender(data.requestInfo.customerInfo.customerGender)} / {data.requestInfo.customerInfo.customerJob}</p>
                                </div>
                                </section>
                                <section style={{backgroundColor:" rgba(255,255,255,0.3)",borderRadius: "20px", padding:"20px", color:"gray"}}>
                                <div>
                                    <div>
                                    <span>투자 금액</span><p>투자가능금액 {data.requestInfo.availableInvestAmount} 중
                                    투자 희망 금액 {data.requestInfo.desiredInvestAmount}</p></div>
                                    <div>
                                        <span>고정 수입</span><p>{data.requestInfo.monthlyIncome}</p></div>
                                        <div>
                                    <span>가계상황</span><p>{householdOptions[data.requestInfo.answer1]}</p></div>
                                    <div>
                                    <span>피부양자</span><p>{dependentOptions[data.requestInfo.answer2]}</p></div>
                                    <div>
                                    <span>투자할 때 중요한 것은</span><p>{investImpOptions[data.requestInfo.answer3]}</p></div>
                                    <div>
                                    <span>포트폴리오에서 한 달간 10%의 손실이 발생했다면, </span><p>{investLossOptions[data.requestInfo.answer4]}</p></div>
                                </div>
                                </section>

                                <h4>요청사항</h4>
                                <section  style={{backgroundColor:" rgba(255,255,255,0.3)",borderRadius: "20px", padding:"20px", color:"gray"}}>
                                    {data.requestInfo.request}
                                </section>
                            </StyledRequestBox>
                        ))}

                        {/* 고객 자산 div */}
                        {activeButton === 2 && (
                            <div>
                                {/* 고객 자산 관련 내용 */}
                                <p><img width="890px"
                                style={{borderRadius:"40px"}} src={data.requestInfo.referenceFileUrl}/></p>
                            </div>
                        )}
                        
                    </StyledContentBlock>
                </StyledHomeContent>
                </StyledHomeMainContent>
                </StyledHomeContainer>
        </>
    )
}