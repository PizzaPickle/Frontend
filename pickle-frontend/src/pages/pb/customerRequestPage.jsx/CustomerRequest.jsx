import React, { useState, useEffect } from "react";
import { StyledHead2Text, StyledHomeContainer, StyledHomeContent, StyledHomeMainContent } from "../../Homepage/HomePage.style";
import Sidebar from "../../../components/common/sidebar/Sidebar";
import Header from "../../../components/common/header/Header";
import { StyledRequestButton, StyledRequestListItem, StyledRequestList } from "./CustomerRequest.style";

export default function CustomerRequest() {
    const [statusFilter, setStatusFilter] = useState("requested");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); 

    const [activeButton, setActiveButton] = useState(1);

    const fetchData = async (status) => {
        setLoading(true); // 로딩중
        try {
            // const response = await fetch(`/api/pickle-common/consulting/customer/request-letters?status=${status}`); // 서버로 요청
            // const result = await response.json();

            // TODO 현재 API 개발 전으로 예시 데이터
            const result = {
                code: 1,
                message: "상담 요청 목록 조회 성공",
                data: [
                  {
                    consultingHistoryId: 1234,
                    requestLetterId: 2,
                    customerId: "coldegg",
                    customerName: "메롱",
                    createdAt: "2024년 5월 9일 11:58",
                    date: "2024년 9월 8일",
                    startTime: "오전 10시 00분",
                    branchOffice: "신한PWM강남센터",
                    status: "requested",
                    consultingRejectInfo: null,
                  },
                  {
                    consultingHistoryId: 1234,
                    requestLetterId: 2,
                    customerId: "coldegg2",
                    customerName: "찬란",
                    createdAt: "2024년 5월 2일 13:58",
                    date: "2024년 9월 10일",
                    startTime: "오후 2시 00분",
                    branchOffice: "신한PWM강남센터",
                    status: "requested",
                    consultingRejectInfo: null,
                  },
                  {
                    consultingHistoryId: 1235,
                    requestLetterId: 3,
                    customerId: "jaewok",
                    customerName: "김재욱",
                    createdAt: "2024년 5월 19일 11:18",
                    date: "2024년 11월 2일",
                    startTime: "오후 5시 30분",
                    branchOffice: "신한PWM강남센터",
                    status: "rejected",
                    consultingRejectInfo: {
                      content: "죄송합니다. 일정이 불가능합니다. 다른 날짜로 예약해주세요.",
                      createdAt: "생성일시",
                    },
                  },
                ],

            }
            setData(result.data); 
        } catch (error) {
            console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(statusFilter);
    }, [statusFilter]); // statusFilter가 변경될 때마다 url에 requested or rejected를 담아 fetch 요청

    const handleRequestedButton = (buttonIndex) => {
        setActiveButton(buttonIndex);
        setStatusFilter("requested")
        console.log(activeButton)
      };

    const handleRejectedButton = (buttonIndex) => {
    setActiveButton(buttonIndex);
    setStatusFilter("rejected")
    console.log(activeButton)

    }

    return (
        <>
        <StyledHomeContainer>
            <Header/>
            <StyledHomeMainContent>                
                <Sidebar/>
                <StyledHomeContent style={{ margin: "20px" }}>
                    <StyledHead2Text style={{ display: "flex", alignItems: "center", gap: "13px" }}>
                        예약을 신청한 고객 목록 <img width="25px" src="/assets/list-icon.svg" alt="list icon" />
                    </StyledHead2Text>
                    
                    <StyledRequestButton>
                        <button onClick={() => handleRequestedButton(1)}
                            className={activeButton === 1 ? 'active' : ''}>
                            대기중
                        </button>
                        <button onClick={() => handleRejectedButton(2)}
                            className={activeButton === 2 ? 'active' : ''}>
                            거절함
                        </button>
                    </StyledRequestButton>

                    {loading && <p>데이터를 가져오는 중입니다...</p>}

                    <StyledRequestList>
                        {data.length > 0 ? (
                            data.map(item => (
                                <StyledRequestListItem key={item.consultingHistoryId} className="request-div"
                                status={item.status}>
                                    <p id="cust-name"><img src="/assets/customer-reserve.svg"/>{item.customerName} 고객님의 요청 </p>
                                    <div className="detail-box">
                                    <div className="consult-date"><span>상담요청일</span><p>{item.date}</p></div>
                                    <div className="consult-time"><span>상담요청시간</span><p> {item.startTime}</p></div>
                                    <div><span>신청일시</span><p>{item.createdAt}</p></div>
                                    </div>
                                </StyledRequestListItem>
                            ))
                        ) : (
                            !loading && <p>해당 상태의 데이터가 없습니다.</p>
                        )}
                    </StyledRequestList>
                </StyledHomeContent>
            </StyledHomeMainContent>
        </StyledHomeContainer>
        </>
    );
}
