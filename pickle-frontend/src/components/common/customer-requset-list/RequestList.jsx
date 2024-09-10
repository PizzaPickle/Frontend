import React from "react";
import {
    CardContainer,
    PBImg,
    PBInfo,
    InfoHeader,
    PBName,
    InfoFooter,
    OfficeName,
    ConsultingTime,
    TimgTag,
    TimeContent,
    ConsultingInfo,
    Container,
    RequestCheck,
    ConsultingStatus,
    ReRequest
} from "./RequestList.style";



export default function RequestList(props) {

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



    return (
        <Container>
        <CardContainer>
            <PBImg src="/assets/PBimg.svg"></PBImg>
            <PBInfo>
                <InfoHeader>
                    <PBName>
                        {props.pbName}
                    </PBName>
                    <OfficeName><img src="/assets/pb-location.svg"></img>신한PWM강남센터</OfficeName>
                    <ConsultingStatus>{props.status}</ConsultingStatus> {/*상담 상태 props로 받기*/}
                </InfoHeader>
                <InfoFooter>
                    <ConsultingTime>
                        <TimgTag>신청 시각</TimgTag>
                        <TimeContent>{formatDate(props.createdAt)}</TimeContent>
                    </ConsultingTime>
                    <ConsultingTime>
                        <TimgTag>상담 요청 시간</TimgTag>
                        <TimeContent>{formatTimeRange(props.date)}</TimeContent>
                    </ConsultingTime>
                </InfoFooter>
            </PBInfo>
            
            
        </CardContainer>
        {/* <ConsultingInfo>
            <RequestCheck>답장 확인 2024/08/19</RequestCheck>
            <ReRequest>다른 날짜로 <br />예약하기</ReRequest>
        </ConsultingInfo> */}
    </Container>
    )
};

