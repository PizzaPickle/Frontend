import React from 'react';
import {
    StyledHeadText,
    StyledHomeContainer,
    StyledHomeContent,
    StyledHomeMainContent,
} from '../homepage/HomePage.style';
import Header from '../../components/common/header/Header';
import Sidebar from '../../components/common/sidebar/Sidebar';
import RequestList from '../../components/common/customer-requset-list/RequestList';
import { StyledRequestButton } from '../pb/customerRequestPage.jsx/CustomerRequest.style';
import { useState, useEffect } from 'react';

export default function MyRequest() {
    const [statusFilter, setStatusFilter] = useState('requested');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [activeButton, setActiveButton] = useState(1);

    const fetchData = async (status) => {
        setLoading(true); // 로딩중
        try {
            const response = await fetch(
                `/api/pickle-common/consulting/customer/request-letters?status=${status}`
            ); // 서버로 요청
            const result = await response.json();
            setData(result.data);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(statusFilter);
    }, [statusFilter]); // statusFilter가 변경될 때마다 url에 1(requested) or 2(rejected)를 담아 fetch 요청

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
                                거절함
                            </button>
                        </StyledRequestButton>

                        <RequestList></RequestList>
                    </StyledHomeContent>
                </StyledHomeMainContent>
            </StyledHomeContainer>
        </>
    );
}
