import React from 'react';
import { fetchStrategyResult } from '../../../api/customerApi';
import {
	CardContainer,
	PBInfo,
	ConsultingStatus,
	InfoHeader,
	PBName,
	InfoFooter,
	ConsultingTime,
	TimgTag,
	TimeContent,
	ConsultingButton,
	Content,
	Container,
} from './ConsultingRoom.style';

export default function HistoryCard({ pbName, status, startTime, endTime, strategyId }) {
	const handleButtonClick = async () => {
		try {
			const result = await fetchStrategyResult(strategyId);
			console.log('API 응답:', result);
		} catch (error) {
			console.error('API 요청 중 오류 발생:', error);
		}
	};

	return (
		<Container>
			<CardContainer>
				<PBInfo>
					<InfoHeader>
						<PBName>{pbName}</PBName>
						<ConsultingStatus>{status}</ConsultingStatus>
					</InfoHeader>
					<InfoFooter>
						<ConsultingTime>
							<TimgTag>만남 진행 시간</TimgTag>
							<TimeContent>{`${startTime} - ${endTime}`}</TimeContent>
						</ConsultingTime>
					</InfoFooter>
				</PBInfo>
			</CardContainer>
			<Content>
				<ConsultingButton onClick={handleButtonClick}>전략 결과 보기</ConsultingButton>
			</Content>
		</Container>
	);
}
