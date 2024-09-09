import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/common/header/Header';
import Sidebar from '../../components/common/sidebar/Sidebar';

import {
    StyledHomeMainContent,
    StyledInputGroup,
    StyledButton,
    StyledFormControl,
    SecondHeader,
    ArrowIcon,
    Previous,
    StrategyName,
    StyledContent,
    CategoryName,
    Category,
    OrderButton,
} from './Order.style';
import {
    StyledHomeContainer,
    StyledHomeContent,
} from '../homepage/HomePage.style';
import StrategyBox from '../../components/common/order/StrategyBox';
import { Database } from 'lucide-react';
import { MdSouth } from 'react-icons/md';

export default function Order() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState('10,000,000');
    const { token } = useSelector((state) => state.user);
    const [stockIds, setStockIds] = useState({});
    const [orderResult, setOrderResult] = useState(0);
    const formatNumber = (value) => {
        if (!value) return '';
        const [integer, decimal] = value.split('.');
        return (
            integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            (decimal ? '.' + decimal : '')
        );
    };
    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, '');
        setInputValue(formatNumber(rawValue));
    };
    const parseFormattedNumber = (value) => {
        // 쉼표를 제거하고 숫자로 변환
        return parseInt(value.replace(/,/g, ''), 10);
    };

    useEffect(() => {
        setData([
            {
                categoryName: '해외',
                categoryRatio: 0.4,
                productList: [
                    {
                        code: 'APPL',
                        name: 'Apple Inc.',
                        ratio: 0.2,
                        myStrategyRatio: 0.0,
                    },
                    {
                        code: 'NBDA',
                        name: 'NBIDA',
                        ratio: 0.8,
                        myStrategyRatio: 0.7,
                    },
                    {
                        code: 'AAPL',
                        name: 'Apple Inc.',
                        ratio: 0.0,
                        myStrategyRatio: 0.3,
                    },
                ],
            },
            {
                categoryName: '국내',
                categoryRatio: 0.5,
                productList: [
                    {
                        code: '005930',
                        name: '삼성',
                        ratio: 0.7,
                        myStrategyRatio: 0.3,
                    },
                    {
                        code: '006666',
                        name: 'Washing Machine',
                        ratio: 0.3,
                        myStrategyRatio: 0.0,
                    },
                    {
                        code: '003230',
                        name: '삼양',
                        ratio: 0.0,
                        myStrategyRatio: 0.7,
                    },
                ],
            },
            {
                categoryName: '채권',
                categoryRatio: 0.5,
                productList: [
                    {
                        code: 'code3',
                        name: 'Refrigerator',
                        ratio: 0.5,
                        myStrategyRatio: 0.0,
                    },
                    {
                        code: 'code4',
                        name: 'Washing Machine',
                        ratio: 0.5,
                        myStrategyRatio: 0.0,
                    },
                ],
            },
        ]);

        // const fetchData = async () => {
        //     try {

        //         const response = await fetch('http://localhost:8080/api/trade/products', {
        //             method: 'GET',
        //             headers: {
        //                 'Authorization': `Bearer ${token}`
        //             },
        //         });
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         const result = await response.json();
        //         setData(result.data);
        //     } catch (error) {
        //         setError(error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // fetchData();
    }, []);
    useEffect(() => {
        if (data) {
            const codes = data.flatMap((category) =>
                category.productList.map((product) => product.code)
            );
            setStockIds(codes);
        }
    }, [data]);

    useEffect(() => {
        const fetchOrderResult = async () => {
            const formattedInputValue = parseFormattedNumber(inputValue);
            try {
                const response = await fetch(
                    'api/pickle-customer/trade/price',
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            inputValue: formattedInputValue,
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();

                setOrderResult(result.price);
            } catch (error) {
                throw new Error('fail');
            }
        };

        if (inputValue) {
            fetchOrderResult();
        }
    }, [inputValue]);

    return (
        <StyledHomeContainer>
            <Header />
            <StyledHomeMainContent>
                <Sidebar />
                <StyledHomeContent>
                    <SecondHeader>
                        <Previous>
                            <ArrowIcon />
                            <StrategyName>중위험 전략</StrategyName>
                        </Previous>
                        <StyledInputGroup>
                            <StyledFormControl
                                value={inputValue}
                                placeholder="1,000,000"
                                onChange={handleChange}
                            />
                            <StyledButton
                                variant="outline-secondary"
                                id="button-addon2"
                            >
                                Apply
                            </StyledButton>
                        </StyledInputGroup>
                    </SecondHeader>
                    <StyledContent>
                        {data &&
                            data.map((category, index) => {
                                if (
                                    category.categoryName === '국내' ||
                                    category.categoryName === '해외'
                                ) {
                                    const categoryStockIds =
                                        category.productList.map(
                                            (product) => product.code
                                        );

                                    return (
                                        <Category key={index}>
                                            <CategoryName>
                                                {category.categoryName}
                                            </CategoryName>
                                            <StrategyBox
                                                productList={
                                                    category.productList
                                                }
                                                stockIds={categoryStockIds}
                                                inputValue={parseFormattedNumber(
                                                    inputValue
                                                )}
                                                categoryRatio={
                                                    category.categoryRatio
                                                }
                                                categoryName={
                                                    category.categoryName
                                                }
                                            />
                                        </Category>
                                    );
                                }
                                return (
                                    <Category key={index}>
                                        <CategoryName>
                                            {category.categoryName}
                                        </CategoryName>

                                        <StrategyBox
                                            productList={category.productList}
                                            stockIds={[]}
                                            inputValue={parseFormattedNumber(
                                                inputValue
                                            )}
                                            categoryRatio={
                                                category.categoryRatio
                                            }
                                            categoryName={category.categoryName}
                                        />
                                    </Category>
                                );
                            })}
                    </StyledContent>
                    <OrderButton>총 {orderResult}원 추가 체결하기</OrderButton>
                </StyledHomeContent>
            </StyledHomeMainContent>
        </StyledHomeContainer>
    );
}
