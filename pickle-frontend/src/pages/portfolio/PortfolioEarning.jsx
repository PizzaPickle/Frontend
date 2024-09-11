import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/header/Header';
import Sidebar from '../../components/common/sidebar/Sidebar';
import { StyledHomeContainer, StyledHomeContent } from '../Homepage/HomePage.style';
import { StyledHomeMainContent, SecondHeader, PageTitle, StartegyTitle } from './PortfolioEarning.style';
import LegendWithGraph from './LegendWithGraph';
import Circular from '../../components/common/circular-graph/Circular';
import { fetchStockPrices } from './fetchStockPrices';

export default function PortfolioEarning() {
  const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.user);
  
  const token = localStorage.getItem('accessToken'); 
  const { prices: stockPrices, loading, error } = useSelector((state) => state.stockPrices);
  const [data, setData] = useState({ categoryDTOs: [] });

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('api/pickle-customer/trade/portfolio', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const transformedData = transformData(result);
        setData(transformedData);
        dispatch(fetchStockPrices(transformedData.categoryDTOs.flatMap(category => category.productDtos)));
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      }
    };

    fetchPortfolio();
  }, [dispatch, token]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const transformData = (data) => {
    return {
      ...data,
      categoryDTOs: data.categoryDTOs.map((category, index) => ({
        label: index + 1,
        id: category.name,
        color: getRandomColor(),
        value: category.ratio,
        totalPurchaseAmount: category.totalPurchaseAmount,
        productDtos: category.productDtos
      }))
    };
  };

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
          <Circular 
            data={data.categoryDTOs} 
            top={"25%"} 
            left={"19%"} 
            width={"400px"} 
            height={"400px"}
          />
          <LegendWithGraph 
            data={data.categoryDTOs} 
            width={"500"} 
            height={"500"} 
            top={"30%"} 
            left={"40%"} 
            fontSize={"small"} 
            gap={"10px"} 
            stockPrices={stockPrices} 
          />
        </StyledHomeContent>
      </StyledHomeMainContent>
    </StyledHomeContainer>
  );
}
