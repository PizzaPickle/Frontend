// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../../components/common/header/Header';
import Sidebar from '../../components/common/sidebar/Sidebar';
import ConsultingRoom from '../../components/common/customer-consulting-room/ConsultingRoom';
import ConsultingRoomHistory from '../../components/common/customer-consulting-room/ConsultingRoomHistory';
import { fetchConsultingHistories } from '../../api/customerApi';
import {
    StyledHeadText,
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


const API_BASE_URL = 'http://pickle.my/consulting-room';

const RealtimeConsultingRoom = () => {
    const userId = useSelector((state) => state.user?.id) || 'soo';
    const userName = useSelector((state) => state.user?.name) || 'soo';
    const [waitingRooms, setWaitingRooms] = useState([]);
    const [consultingHistory, setConsultingHistory] = useState([]);
    const [activeTab, setActiveTab] = useState('waiting');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // fetchWaitingRooms 함수를 useCallback으로 메모이제이션
    const fetchWaitingRooms = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            console.log('Fetching room list for user:', userId);
            console.log('API URL:', `${API_BASE_URL}?userId=${userId}`);

            axios
                .get(`${API_BASE_URL}?userId=${userId}`, {
                    withCredentials: true,
                    timeout: 5000,
                })
                .then((response) => {
                    console.log('Server response:', response.data);
                    setWaitingRooms(response.data);
                })
                .catch((error) => {
                    console.error('Error from server:', error);
                });
        } catch (error) {
            console.error('Error fetching room list:', error);
            if (error.response) {
                console.error(
                    'Server responded with error:',
                    error.response.status,
                    error.response.data
                );
                setError(
                    `서버 오류: ${error.response.status} - ${
                        error.response.data.message || '알 수 없는 오류'
                    }`
                );
            } else if (error.request) {
                console.error('No response received:', error.request);
                setError(
                    '서버에서 응답이 없습니다. 네트워크 연결을 확인해주세요.'
                );
            } else {
                console.error('Error setting up request:', error.message);
                setError(`요청 중 오류 발생: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const fetchConsultingHistory = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetchConsultingHistories();
            const data = await response.json();
            setConsultingHistory(data);
        } catch (err) {
            setError(
                '상담 내역을 불러오는 데 실패했습니다. 다시 시도해 주세요.'
            );
            console.error('Error fetching consulting history:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'waiting') {
            fetchWaitingRooms();
            const intervalId = setInterval(fetchWaitingRooms, 30000); // 30초마다 업데이트
            return () => clearInterval(intervalId);
        } else if (activeTab === 'history') {
            fetchConsultingHistory();
        }
    }, [activeTab, fetchWaitingRooms]);

    const joinConsultingRoom = (roomId, userName, userId) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `${API_BASE_URL}/${roomId}`;
        form.target = `consultingRoom_${roomId}`;

        const fields = [
            { name: 'roomId', value: roomId },
            { name: 'userName', value: userName },
            { name: 'userId', value: userId },
        ];

        fields.forEach((field) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
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
        const differenceInDays = Math.ceil(
            differenceInTime / (1000 * 3600 * 24)
        );

        if (differenceInDays === 0) return '오늘';
        if (differenceInDays === 1) return '내일';
        if (differenceInDays > 1) return `${differenceInDays}일 후`;
        return `${-differenceInDays}일 전에 진행된 상담`;
    };

    const renderWaitingRooms = () => {
        if (isLoading) return <p>로딩 중...</p>;
        if (error) return <p>{error}</p>;
        if (waitingRooms.length === 0)
            return <p>대기중인 상담방이 없습니다.</p>;

        return waitingRooms.map((room) => (
            <ConsultingRoom
                key={room.roomId}
                room={room}
                pbName={`${room.pbName} PB`}
                pbImage={room.pbImage}
                status="대기중"
                officeName={room.pbBranchOffice}
                consultingTime={formatDate(room.date)}
                daysUntilConsulting={calculateDaysUntilConsulting(room.date)}
                onJoinRoom={() =>
                    joinConsultingRoom(room.roomId, userName, userId)
                }
            />
        ));
    };

    const renderConsultingHistory = () => {
        if (isLoading) return <p>로딩 중...</p>;
        if (error) return <p>{error}</p>;
        if (!consultingHistory || consultingHistory.length === 0)
            return <p>상담 내역이 없습니다.</p>;

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
                    <StyledHeadText>
                        {userName.slice(1)}님의 실시간 상담
                    </StyledHeadText>
                    <StyledTabs>
                        <StyledTab
                            $active={activeTab === 'waiting'}
                            onClick={() => setActiveTab('waiting')}
                        >
                            대기중
                        </StyledTab>
                        <StyledTab
                            $active={activeTab === 'history'}
                            onClick={() => setActiveTab('history')}
                        >
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
                                        <StyledContentFlex>
                                            {renderWaitingRooms()}
                                        </StyledContentFlex>
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
