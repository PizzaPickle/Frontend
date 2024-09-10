import React from 'react';
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
	Container,
} from './ConsultingRoom.style';

export default function ConsultingRoom({ pbName, pbImage, status, officeName, consultingTime, daysUntilConsulting, onJoinRoom }) {
	return (
		<Container>
			<CardContainer>
				<>
					<PBImg src={pbImage || '/assets/PBimg.svg'}></PBImg>
					<PBInfo>
						<InfoHeader>
							<PBName>{pbName}</PBName>
							<ConsultingStatus>{status} </ConsultingStatus>
						</InfoHeader>
						<InfoFooter>
							<Location>
								<Icon src="/assets/MapPin.svg"></Icon>
								<OfficeName>{officeName}</OfficeName>
							</Location>
							<ConsultingTime>
								<TimgTag>만남 예정 시간</TimgTag>
								<TimeContent>{consultingTime}</TimeContent>
							</ConsultingTime>
						</InfoFooter>
					</PBInfo>
				</>
			</CardContainer>
			<ConsultingInfo>
				<AlarmIcon src="/assets/bell.svg" />
				<Content>{daysUntilConsulting === '오늘' ? '오늘 입니다!' : `${daysUntilConsulting} 입니다!`}</Content>
				<ConsultingButton onClick={onJoinRoom}>상담 시작</ConsultingButton> {/*props로 상태 받기*/}
			</ConsultingInfo>
		</Container>
	);
}
