import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import Header from '../../components/common/header/Header';
import Sidebar from '../../components/common/sidebar/Sidebar';
import ConsultingRoom from '../../components/common/customer-consulting-room/ConsultingRoom';
import ConsultingRoomHistory from '../../components/common/customer-consulting-room/ConsultingRoomHistory';
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
import ConsultingSession from './ConsultingSession';

const RealtimeConsultingRoom = () => {
	//TODO: 테스트일 때만 'soo', 배포 시 삭제
	const userId = useSelector((state) => state.user?.id) || 'soo';
	const userName = useSelector((state) => state.user?.name) || 'soo';
	const [waitingRooms, setWaitingRooms] = useState([]);
	const [consultingHistory, setConsultingHistory] = useState([]);
	const [activeTab, setActiveTab] = useState('waiting');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [inCall, setInCall] = useState(false);
	const [currentRoomId, setCurrentRoomId] = useState(null);
	const [roomInfo, setRoomInfo] = useState([]);
	const socketRef = useRef(null);

	useEffect(() => {
		//TODO: 추후 실시간 상담 서버로 변경
		socketRef.current = io('http://localhost:3000');

		socketRef.current.on('connect', () => {
			console.log('Socket connected');
			if (activeTab === 'waiting') {
				requestWaitingRooms();
			}
		});

		socketRef.current.on('receiveRoomList', (roomList) => {
			const rooms = JSON.parse(roomList);
			setWaitingRooms(rooms);
		});

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
		};
	}, []);

	useEffect(() => {
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
		const fakeData = [
			{
				id: 1,
				pbName: '오수연',
				status: '완료',
				startTime: '2024-09-03T10:15:30.000Z',
				strategyId: 'strat001',
			},
			{
				id: 2,
				pbName: '이원규',
				status: '대기중',
				startTime: '2024-09-03T10:15:30.000Z',
				strategyId: 'strat002',
			},
			{
				id: 3,
				pbName: '윤재욱',
				status: '취소됨',
				startTime: '2024-09-03T10:15:30.000Z',
				strategyId: 'strat003',
			},
		];
		setIsLoading(true);
		setError(null);
		try {
			setConsultingHistory(fakeData);
			//TODO: pickle-common 서버에 API 요청,
			// const response = await fetchConsultingHistories();
			// setConsultingHistory(response.data);
		} catch (err) {
			setError('상담 내역을 불러오는 데 실패했습니다. 다시 시도해 주세요.');
			console.error('Error fetching consulting history:', err);
		} finally {
			setIsLoading(false);
		}
	};

	const joinConsultingRoom = (roomId) => {
		console.log(`Joining room: ${roomId}`);

		// 기존 소켓 연결 해제
		if (socketRef.current) {
			socketRef.current.disconnect();
		}

		// 새로운 소켓 연결 생성
		socketRef.current = io('http://localhost:3000');

		socketRef.current.on('connect', () => {
			console.log('New socket connected for consulting room');

			socketRef.current.emit('joinConsultingRoom', { userId, roomId });

			socketRef.current.on('joinedConsultingRoom', (response) => {
				console.log('Joined consulting room:', response);
				setRoomInfo(response);
				setInCall(true);
				setCurrentRoomId(roomId);
			});

			socketRef.current.on('error', (error) => {
				console.error('Error joining consulting room:', error);
			});
		});
	};

	const leaveConsultingRoom = () => {
		if (socketRef.current) {
			socketRef.current.emit('leaveConsultingRoom', { userId, roomId: currentRoomId });
			socketRef.current.disconnect();
		}
		setInCall(false);
		setCurrentRoomId(null);
		setRoomInfo([]);

		// 대기실용 소켓 재연결
		socketRef.current = io('http://localhost:3000');
		requestWaitingRooms();
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
				onJoinRoom={() => joinConsultingRoom(room.roomId)}
			/>
		));
	};
	const addMinutes = (dateString, minutes) => {
		const date = new Date(dateString);
		return new Date(date.getTime() + minutes * 60000);
	};
	const renderConsultingHistory = () => {
		if (isLoading) return <p>로딩 중...</p>;
		if (error) return <p>{error}</p>;
		if (!consultingHistory || consultingHistory.length === 0) return <p>상담 내역이 없습니다.</p>;
		return consultingHistory.map((history) => {
			const endTime = addMinutes(history.startTime, 30);
			return (
				<ConsultingRoomHistory
					key={history.id}
					pbName={history.pbName}
					status={history.status}
					startTime={formatDate(history.startTime)}
					endTime={formatDate(endTime)}
					strategyId={history.strategyId}
				/>
			);
		});
	};

	return (
		<StyledConsultingContainer>
			<Header />
			<StyledConsultingMainContent>
				<Sidebar />
				<StyledConsultingContent>
					{!inCall ? (
						<>
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
						</>
					) : (
						<ConsultingSession
							userId={userId}
							userName={userName}
							roomId={currentRoomId}
							socket={socketRef.current}
							onLeave={leaveConsultingRoom}
						/>
					)}
				</StyledConsultingContent>
			</StyledConsultingMainContent>
		</StyledConsultingContainer>
	);
};

export default RealtimeConsultingRoom;
