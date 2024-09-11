import React from 'react';
import {
    StyledHeadText,
    StyledHomeContainer,
    StyledHomeContent,
    StyledHomeMainContent,
} from '../homePage/HomePage.style';
import Header from '../../components/common/header/Header';
import Sidebar from '../../components/common/sidebar/Sidebar';
import RequestList from '../../components/common/customer-requset-list/RequestList';
import { StyledRequestButton } from '../pb/customerRequestPage/CustomerRequest.style';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function MyRequest() {
    // const { token } = useSelector((state) => state.user);
    // const token = localStorage.getItem('token'); 


    const [statusFilter, setStatusFilter] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [myRequest, setMyRequest] = useState([]);

    const [activeButton, setActiveButton] = useState(1);

    const getStatusLabel = (status) => {
        if (status === 'REQUESTED') {
            return '대기중';
        } else if (status === 'REJECTED') {
            return '거절됨';
        } else {
            return '알 수 없음';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // 로딩중
            try {
                const token = localStorage.getItem('token'); 
                const response = await fetch(
                    `/api/pickle-common/consulting/customer/request-letters?status=${statusFilter}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    console.log(
                        `네트워크 응답이 올바르지 않습니다: ${errorText}`
                    );
                    setError('서버 응답 오류');
                    return;
                }

                const result = await response.json();

                setMyRequest(result.data);
                console.log(result.data);
            } catch (error) {
                console.log('데이터 요청 실패:', error.message);
                setError(error.message);
            }
        };

        fetchData(statusFilter);
    }, [statusFilter]);

    const handleRequestedButton = (buttonIndex) => {
        setActiveButton(buttonIndex);
        setStatusFilter(1);
        console.log(activeButton);
    };

    const handleRejectedButton = (buttonIndex) => {
        setActiveButton(buttonIndex);
        setStatusFilter(2);
        console.log(activeButton);
    };

    return (
        <>
            <StyledHomeContainer>
                <Header />
                <StyledHomeMainContent>
                    <Sidebar />
                    <StyledHomeContent>
                        <StyledHeadText
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '13px',
                            }}
                        >
                            내가 보낸 예약 요청 목록{' '}
                            <img
                                width="25px"
                                src="/assets/list-icon.svg"
                                alt="list icon"
                            />
                        </StyledHeadText>

                        <StyledRequestButton>
                            <button
                                onClick={() => handleRequestedButton(1)}
                                className={activeButton === 1 ? 'active' : ''}
                            >
                                대기중
                            </button>
                            <button
                                onClick={() => handleRejectedButton(2)}
                                className={activeButton === 2 ? 'active' : ''}
                            >
                                거절됨
                            </button>
                        </StyledRequestButton>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                            }}
                        >
                            {myRequest.map((elem) => (
                                <RequestList
                                    pbName={elem.pbName}
                                    status={getStatusLabel(elem.status)}
                                    createdAt={elem.createdAt}
                                    date={elem.date}
                                ></RequestList>
                            ))}
                        </div>
                    </StyledHomeContent>
                </StyledHomeMainContent>
            </StyledHomeContainer>
        </>
    );
}
