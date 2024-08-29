import React from "react";
import {
    CardContainer,
    PBImg,
    PBInfo,
    ConsultingStatus,
    InfoHeader,
    PBName,
    InfoFooter,
    Icon,
    OfficeName,
    ConsultingTime,
    TimgTag,
    TimeContent,
    Location,
    ConsultingInfo,
    AlarmIcon,
    ConsultingButton,
    Content,
    Container
} from "./ConsultingRoom.style";



export default function ConsultingRoom(props) {
    return (
        <Container>
        <CardContainer>
            <>
                <PBImg src="/assets/PBimg.svg"></PBImg>
                <PBInfo>
                    <InfoHeader>
                    <PBName>
                        윤재욱 PB
                    </PBName>
                    <ConsultingStatus> {/* 상담 상태 props 전달 */ }
                        대기중
                    </ConsultingStatus>
                    </InfoHeader>
                    <InfoFooter>
                        <Location>
                        <Icon src="/assets/MapPin.svg"></Icon>
                        <OfficeName>신한PWM 강남 센터</OfficeName>
                        </Location>
                        <ConsultingTime>
                            <TimgTag>만남 예정 시간</TimgTag>
                            <TimeContent>2024/08/19 오후 2시</TimeContent>
                        </ConsultingTime>
                    </InfoFooter>
                </PBInfo>
            </>
            
        </CardContainer>
        <ConsultingInfo>
        <AlarmIcon src="/assets/bell.svg"/>
        <Content>
            오늘 입니다!
        </Content>
        <ConsultingButton>오후 2:00 시작</ConsultingButton> {/*props로 상태 받기*/}
    </ConsultingInfo>
    </Container>
    )
};

