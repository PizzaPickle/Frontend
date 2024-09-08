import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import Header from '../../components/common/header/Header';
import Sidebar from '../../components/common/sidebar/Sidebar';
import ConsultingRoom from '../../components/common/customer-consulting-room/ConsultingRoom';
import ConsultingRoomHistory from '../../components/common/customer-consulting-room/ConsultingRoomHistory';
import { fetchConsultingHistories } from '../../api/customerApi';
import {
	StyledHead2Text,
	StyledContentBlock,
	StyledConsultingContainer,
	StyledConsultingContent,
	StyledConsultingMainContent,
	StyledConsultingSection,
	StyledContentFlex,
	StyledTabs,
	StyledTab,
	StyledTabContent,
} from './RealtimeConsulting.style';

const SOCKET_SERVER_URL = 'http://localhost:3000';
const API_BASE_URL = 'http://localhost:3000/api';

const RealtimeConsultingRoom = () => {
	const userId = useSelector((state) => state.user?.id) || 'soo';
	const userName = useSelector((state) => state.user?.name) || 'soo';
	const [waitingRooms, setWaitingRooms] = useState([]);
	const [consultingHistory, setConsultingHistory] = useState([]);
	const [activeTab, setActiveTab] = useState('waiting');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const socketRef = useRef(null);

	useEffect(() => {
		socketRef.current = io(SOCKET_SERVER_URL);

		socketRef.current.on('connect', () => {
			console.log('Socket connected');
			if (activeTab === 'waiting') {
				requestWaitingRooms();
			}
		});

		socketRef.current.on('receiveRoomList', (roomList) => {
			setWaitingRooms(JSON.parse(roomList));
		});

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
		};
	}, []);

	useEffect(() => {
		// 탭 변경 시 로딩 및 에러 상태 초기화
		setIsLoading(false);
		setError(null);

		
		if (activeTab === 'waiting') {
			requestWaitingRooms();
		} else if (activeTab === 'history') {
			fetchConsultingHistory();
		}
	}, [activeTab]);

	const requestWaitingRooms = () => {
		if (socketRef.current && socketRef.current.connected) {
			socketRef.current.emit('requestRoomList', { userId });
		}
	};

	const fetchConsultingHistory = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetchConsultingHistories();
			const data = await response.json();
			setConsultingHistory(data);
		} catch (err) {
			setError('상담 내역을 불러오는 데 실패했습니다. 다시 시도해 주세요.');
			console.error('Error fetching consulting history:', err);
		} finally {
			setIsLoading(false);
		}
	};

	const joinConsultingRoom = (roomId, userName, userId) => {
		// 동적으로 폼을 생성
		const form = document.createElement('form');
		form.method = 'POST';
		form.action = `${API_BASE_URL}/consulting-room/${roomId}`;
		form.target = `consultingRoom_${roomId}`; // 새 창의 이름 설정

		// roomId 필드 생성
		const roomIdField = document.createElement('input');
		roomIdField.type = 'hidden';
		roomIdField.name = 'roomId';
		roomIdField.value = roomId;
		form.appendChild(roomIdField);

		// userName 필드 생성
		const userNameField = document.createElement('input');
		userNameField.type = 'hidden';
		userNameField.name = 'userName';
		userNameField.value = userName;
		form.appendChild(userNameField);

		// userId 필드 생성
		const userIdField = document.createElement('input');
		userIdField.type = 'hidden';
		userIdField.name = 'userId';
		userIdField.value = userId;
		form.appendChild(userIdField);

		// 폼을 새 창에서 제출하기
		document.body.appendChild(form);
		form.submit();

		// 폼 제출 후 DOM에서 제거
		document.body.removeChild(form);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = date.getHours();
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const ampm = hours >= 12 ? '오후' : '오전';
		const formattedHours = hours % 12 || 12;

		return `${year}/${month}/${day} ${ampm} ${formattedHours}:${minutes}`;
	};

	const calculateDaysUntilConsulting = (consultingDate) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const consultingDay = new Date(consultingDate);
		consultingDay.setHours(0, 0, 0, 0);

		const differenceInTime = consultingDay.getTime() - today.getTime();
		const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

		if (differenceInDays === 0) {
			return '오늘';
		} else if (differenceInDays === 1) {
			return '내일';
		} else if (differenceInDays > 1) {
			return `${differenceInDays}일 후`;
		} else {
			return `${-differenceInDays}일 전에 진행된 상담`;
		}
	};

	const renderWaitingRooms = () => {
		if (isLoading) return <p>로딩 중...</p>;
		if (error) return <p>{error}</p>;
		if (waitingRooms.length === 0) return <p>대기중인 상담방이 없습니다.</p>;

		return waitingRooms.map((room) => (
			<ConsultingRoom
				room={room}
				key={room.roomId}
				pbName={`${room.pbName} PB`}
				pbImage={room.pbImage}
				status="대기중"
				officeName={room.pbBranchOffice}
				consultingTime={formatDate(room.date)}
				daysUntilConsulting={calculateDaysUntilConsulting(room.date)}
				onJoinRoom={() => joinConsultingRoom(room.roomId, userName, userId)}
			/>
		));
	};

	const renderConsultingHistory = () => {
		if (isLoading) return <p>로딩 중...</p>;
		if (error) return <p>{error}</p>;
		if (!consultingHistory || consultingHistory.length === 0) return <p>상담 내역이 없습니다.</p>;
		return consultingHistory.map((history) => (
			<ConsultingRoomHistory
				key={history.id}
				pbName={history.pbName}
				status={history.status}
				startTime={formatDate(history.startTime)}
				endTime={formatDate(history.endTime)}
				strategyId={history.strategyId}
			/>
		));
	};

	return (
		<StyledConsultingContainer>
			<Header />
			<StyledConsultingMainContent>
				<Sidebar />
				<StyledConsultingContent>
					<StyledHead2Text>{userName.slice(1)}님의 실시간 상담</StyledHead2Text>
					<StyledTabs>
						<StyledTab active={activeTab === 'waiting'} onClick={() => setActiveTab('waiting')}>
							대기중
						</StyledTab>
						<StyledTab active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
							상담내역
						</StyledTab>
					</StyledTabs>
					<StyledTabContent>
						{activeTab === 'waiting' && (
							<StyledConsultingSection>
								<StyledContentBlock>
									<div id="welcome" className="section">
										<h4>대기중인 상담룸</h4>
									</div>
									<div id="roomList" className="section">
										<StyledContentFlex>{renderWaitingRooms()}</StyledContentFlex>
									</div>
								</StyledContentBlock>
							</StyledConsultingSection>
						)}
						{activeTab === 'history' && (
							<StyledConsultingSection>
								<StyledContentBlock>
									<div id="history" className="section">
										<h4>상담 내역</h4>
									</div>
									<div id="historyList" className="section">
										{renderConsultingHistory()}
									</div>
								</StyledContentBlock>
							</StyledConsultingSection>
						)}
					</StyledTabContent>
				</StyledConsultingContent>
			</StyledConsultingMainContent>
		</StyledConsultingContainer>
	);
};

export default RealtimeConsultingRoom;
