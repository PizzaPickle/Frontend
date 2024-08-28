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
    return (
        <Container>
        <CardContainer>
            <PBImg src="/assets/PBimg.svg"></PBImg>
            <PBInfo>
                <InfoHeader>
                    <PBName>
                        To. 윤재욱 PB
                    </PBName>
                    <OfficeName>신한PWM 강남 센터</OfficeName>
                    <ConsultingStatus>예약 실패</ConsultingStatus> {/*상담 상태 props로 받기*/}
                </InfoHeader>
                <InfoFooter>
                    <ConsultingTime>
                        <TimgTag>신청 시각</TimgTag>
                        <TimeContent>2024/08/19 오후 2:00 - 오후 2:30</TimeContent>
                    </ConsultingTime>
                    <ConsultingTime>
                        <TimgTag>상담 요청 시간</TimgTag>
                        <TimeContent>2024/08/19 오후 2:00 - 오후 2:30</TimeContent>
                    </ConsultingTime>
                </InfoFooter>
            </PBInfo>
            
            
        </CardContainer>
        <ConsultingInfo>
            <RequestCheck>답장 확인 2024/08/19</RequestCheck>
            <ReRequest>다른 날짜로 <br />예약하기</ReRequest>
        </ConsultingInfo>
    </Container>
    )
};

