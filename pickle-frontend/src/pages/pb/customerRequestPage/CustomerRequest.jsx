import React, { useState, useEffect } from "react";
import { StyledHead2Text, StyledHomeContainer, StyledHomeContent, StyledHomeMainContent } from "../../homePage/HomePage.style";
import Sidebar from "../../../components/common/sidebar/Sidebar";
import Header from "../../../components/common/header/Header";
import { StyledRequestButton, StyledRequestListItem, StyledRequestList } from "./CustomerRequest.style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PbSidebar from "../../../components/common/pbsidebar/PbSidebar";

export default function CustomerRequest() {
    const { token } = useSelector((state) => state.pbuser); 
    const pbName = useSelector((state)=>state.pb.name);
    const navigate = useNavigate();

    const [statusFilter, setStatusFilter] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); 

    const [activeButton, setActiveButton] = useState(1);

    const fetchData = async (status) => {
        setLoading(true); // 로딩중
        try {
            const response = await fetch(`/api/pickle-common/consulting/pb/request-letters?status=${status}`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }); // 서버로 요청
              console.log(status)
            const result = await response.json();
            console.log(result.data)
            setData(result.data); 
        } catch (error) {
            console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(statusFilter);
    }, [statusFilter, token]); // statusFilter가 변경될 때마다 url에 requested or rejected를 담아 fetch 요청

    const handleRequestedButton = (buttonIndex) => {
        setActiveButton(buttonIndex);
        setStatusFilter(1)
        console.log(activeButton)
      };

    const handleRejectedButton = (buttonIndex) => {
    setActiveButton(buttonIndex);
    setStatusFilter(2)
    console.log(activeButton)

    }

    
    function formatDate(dateTimeString) {
        const dateObj = new Date(dateTimeString);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
      }
      
      // 시간 범위 포맷 함수 (오전/오후 HH:MM - HH:MM 형식으로 반환)
      function formatTimeRange(dateTimeString) {
        const dateObj = new Date(dateTimeString);
      
        // 시간 포맷 함수 (오전/오후 형식)
        const formatTime = (hours, minutes) => {
          const period = hours < 12 ? '오전' : '오후';
          const adjustedHours = hours % 12 || 12; // 0시를 12시로 변경
          const formattedMinutes = String(minutes).padStart(2, '0');
          return `${period} ${adjustedHours}:${formattedMinutes}`;
        };
      
        // 시작 시간 (startTime)
        const startHours = dateObj.getHours();
        const startMinutes = dateObj.getMinutes();
        const startTime = formatTime(startHours, startMinutes);
      
        // 30분 더한 종료 시간 (endTime)
        const endDateObj = new Date(dateObj.getTime() + 30 * 60000); // 30분 추가
        const endHours = endDateObj.getHours();
        const endMinutes = endDateObj.getMinutes();
        const endTime = formatTime(endHours, endMinutes);
      
        return `${startTime} - ${endTime}`;
    }

    const formatWholeDate = (dateString) => {
        const date = new Date(dateString);
        
        // 연, 월, 일 추출
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
        const day = String(date.getDate()).padStart(2, '0');

        // 시간과 분 추출
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}`;
        };


    const handleReqNav = (id) => {
        //요청서 상세조회 페이지로 이동
        navigate(`${id}`);
        };

    return (
        <>
        <StyledHomeContainer>
            <Header/>
            <StyledHomeMainContent>                
                <PbSidebar/>
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

                    {loading && <p>Loading ..</p>}

                    <StyledRequestList>
                        {data? (
                            data.map(item => (
                                <StyledRequestListItem  id={item.requestLetterId}
                                onClick={() => handleReqNav(item.requestLetterId)}
                                key={item.consultingHistoryId} className="request-div"
                                status={item.status}>
                                    <p id="cust-name"><img src="/assets/customer-reserve.svg"/>{item.customerName} 고객님의 요청 </p>
                                    <div className="detail-box">
                                    <div className="consult-date"><span>상담요청일</span><p>{formatDate(item.date)}</p></div>
                                    <div className="consult-time"><span>상담요청시간</span><p> {formatTimeRange(item.date)}</p></div>
                                    <div><span>신청일시</span><p>{formatWholeDate(item.createdAt)}</p></div>
                                    </div>
                                </StyledRequestListItem>
                            ))
                        ) : (
                            !loading && <p> 예약을 보낸 고객이 없습니다.</p>
                        )}
                    </StyledRequestList>
                </StyledHomeContent>
            </StyledHomeMainContent>
        </StyledHomeContainer>
        </>
    );
}
