import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/common/header/Header';
import Sidebar from '../../components/common/sidebar/Sidebar';
import { StyledHomeContainer, StyledHomeContent } from '../Homepage/HomePage.style'
import {
  StyledHomeMainContent,
  SecondHeader,
  PageTitle,
  StartegyTitle
} from './PortfolioEarning.style'
import LegendWithGraph from './LegendWithGraph';
import Circular from '../../components/common/circular-graph/Circular';
import { fetchStockPrices } from './fetchStockPrices';

export default function PortfolioEarning() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { prices: stockPrices, loading, error } = useSelector((state) => state.stockPrices);
  const [data, setData]=useState({
    "portfolioName": "My Strategy Name",
    "categoryDTOs": [
      {
        "label":1,
        "id":"해외",
        "color": "pink",
        "value": 0.5,
        "totalPurchaseAmount": 32496.0,
        "productDtos": [
          {
            "name": "Apple Inc.",
            "code": "AAPL",
            "quantity": 5.5,
            "ratio": 0.3,
            "themeName": "Tech Giants",
            "purchaseAmount": 16500.0,
            "categoryName": "해외"
          },
          {
            "name": "엔비디아",
            "code": "NBDA",
            "quantity": 4.0,
            "ratio": 0.7,
            "themeName": "Tech Giants",
            "purchaseAmount": 15996.0,
            "categoryName": "해외"
          }
        ]
      },
      {
        "label": "3",
        "id":"국내",
        "color":"#FF8B67",
        "value": 0.5,
        "totalPurchaseAmount": 245000.0,
        "productDtos": [
          {
            "name": "삼성",
            "code": "005930",
            "quantity": 20.0,
            "ratio": 0.4,
            "themeName": "Tech Giants",
            "purchaseAmount": 200000.0,
            "categoryName": "국내"
          },
          {
            "name": "삼양",
            "code": "003230",
            "quantity": 10.0,
            "ratio": 0.6,
            "themeName": "Tech Giants",
            "purchaseAmount": 45000.0,
            "categoryName": "국내"
          }
        ]
      }
    ]
  });
  
  useEffect(() => {
    const fetchPortfolio = async () => {
        try {
            // const response = await fetch('api/pickle-customer/trade/portfolio', {
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'application/json'
            //     },
  
            // });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            // const result = await response.json();
            // setData(result.data);
            console.log(data);
            dispatch(fetchStockPrices(data.categoryDTOs.flatMap(category => category.productDtos)));
        } catch (error) {
            throw new Error('fail');
            
        }
    };
    fetchPortfolio();
    
}, [dispatch, token]);
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;



  return (
    <StyledHomeContainer>
            <Header />
            <StyledHomeMainContent>
                <Sidebar />
                <StyledHomeContent>
                    <SecondHeader>
                      <PageTitle>포트폴리오 성과 확인</PageTitle>
                      <StartegyTitle>{data.portfolioName}</StartegyTitle>
                    </SecondHeader>
                    <Circular data={data.categoryDTOs} top={"28%"} left={"19%"} width={"350px"} height={"350px"}></Circular>
                    
                    <LegendWithGraph data={data.categoryDTOs} width={"500"} height={"500"} top={"30%"} left={"38%"} fontSize={"small"} gap={"10px"} stockPrices={stockPrices} />
                    
                </StyledHomeContent>
            </StyledHomeMainContent>
    </StyledHomeContainer>
  )
}
