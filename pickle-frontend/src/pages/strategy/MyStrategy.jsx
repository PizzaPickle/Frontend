import React, { useEffect, useState } from "react";
import Sidebar from "../../components/common/sidebar/Sidebar";
import Header from "../../components/common/header/Header";
import { StyledHomeContainer, StyledHomeMainContent, StyledHomeContent, StyledHomeSection, StyledHead2Text, StyledContentBlock } from "../homePage/HomePage.style";
import StrategyList from "../../components/common/strategy/list/StrategyList";
import { LegendDiv } from "../backtestPage/BacktestPage.style";
import { LegendWithGraphDiv } from "../../components/common/strategy/box/StrategyBox.style";
import Legend from "../../components/common/legend/Legend";
import { LegendListDiv } from "./MyStrategy.style";
import StockTable from "../../components/common/stock-table/StockTable";
import { CircularDiv } from "../../components/common/graph-width-legend/LegendWithGraph.style";
import Circular from "../../components/common/circular-graph/Circular";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyStrategy() {
  // 초기 categoryData
  const [curProductList, setCurProductList] = useState(null);
  const navigate=useNavigate();
  const [categoryData, setCategoryData] = useState([
    {
      id: "국내",
      label: 1,
      value: 0,
      color: "#FF6767",
      productList: [],
      isValidProductRatio: false,
      selected: true,
      themeList: [],
    },
    {
      id: "해외",
      label: 2,
      value: 0,
      color: "#FFC27B",
      productList: [],
      isValidProductRatio: false,
      selected: false,
      themeList: [],
    },
    {
      id: "채권",
      label: 3,
      value: 0,
      color: "#FF8B67",
      productList: [],
      isValidProductRatio: false,
      selected: false,
      themeList: [],
    },
    {
      id: "ETF",
      label: 4,
      value: 0,
      color: "#FFADB6",
      productList: [],
      isValidProductRatio: false,
      selected: false,
      themeList: [],
    },
    {
      id: "원자재",
      label: 5,
      value: 0,
      color: "#ffd9ad",
      productList: [],
      isValidProductRatio: false,
      selected: false,
      themeList: [],
    },
  ]);

  // 초기 strategyList
  const [data, setData] = useState({
    strategyList: [
      {
        id: 1,
        name: "전략생성테스트",
        pbName: "pb1",
        pbBranchOffice: "강남점",
        createdAt: "2024-09-02T11:27:36",
        categoryList: [
          {
            categoryName: "국내",
            categoryRatio: 0.5,
            productList: [
              { code: "005930", name: "삼성전자", themeName: "반도체", ratio: 0.3 },
              { code: "068270", name: "셀트리온", themeName: "바이오", ratio: 0.7 },
            ],
          },
          {
            categoryName: "해외",
            categoryRatio: 0.5,
            productList: [
              { code: "BAQAAPL", name: "애플", themeName: "IT", ratio: 0.6 },
              { code: "BAQTSLA", name: "테슬라", themeName: "자동차", ratio: 0.4 },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "전략생성테스트2",
        pbName: "pb1",
        pbBranchOffice: "강남점",
        createdAt: "2024-09-01T11:27:29",
        categoryList: [
          {
            categoryName: "국내",
            categoryRatio: 0.6,
            productList: [
              { code: "005930", name: "삼성전자", themeName: "반도체", ratio: 0.5 },
              { code: "068270", name: "셀트리온", themeName: "바이오", ratio: 0.5 },
            ],
          },
          {
            categoryName: "해외",
            categoryRatio: 0.4,
            productList: [
              { code: "BAQAAPL", name: "애플", themeName: "IT", ratio: 0.6 },
            ],
          },
        ],
      },
    ],
  });

  const getStrategyCustomerData = async () => {
    try {
      // localStorage에서 토큰 가져오기
      const token = localStorage.getItem('accessToken');
  
      // axios GET 요청 보내기
      const response = await axios.get('/api/pickle-common/strategy', {
        headers: {
          // Authorization 헤더에 Bearer 토큰 추가
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      // 성공적으로 데이터를 받았을 경우
      if (response !== null) {
        setData(response.data.data);
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching strategy customer data:', error);
      throw error;
    }
  };

  useEffect(()=>{
    getStrategyCustomerData();
  },[])

  // 선택된 전략 데이터를 관리하는 상태
  const [selectedStrategyData, setSelectedStrategyData] = useState(null);

  // 전략을 클릭할 때마다 해당 strategy의 데이터를 설정
  const handleStrategyDetail = (id) => {
    const selectedStrategy = data.strategyList.find(
      (strategy) => strategy.id === id
    );
    console.log(selectedStrategy.categoryList[0].productList)
    setCurProductList([selectedStrategy.categoryList[0].productList])
    setSelectedStrategyData(selectedStrategy);
  };

  // categoryName과 categoryRatio를 id와 value에 매핑
  useEffect(() => {
    if (selectedStrategyData) {
      const updatedCategoryData = categoryData.map((category) => {
        const matchedCategory = selectedStrategyData.categoryList.find(
          (serverCategory) => serverCategory.categoryName === category.id
        );

        if (matchedCategory) {
          return {
            ...category,
            value: matchedCategory.categoryRatio * 100, // categoryRatio를 퍼센트로 변환
            productList: matchedCategory.productList, // 서버에서 받은 productList 추가
            isValidProductRatio: true, // 유효성 처리
          };
        }
        return category;
      });

      setCategoryData(updatedCategoryData);
    }
  }, [selectedStrategyData]); // selectedStrategyData가 변경될 때만 실행

  const selectCategory = (category) => {
    // console.log(category);
    console.log(category.productList)
    setCurProductList(category.productList);
  }
  const handleClick = () => {
    const strategyName = selectedStrategyData.name;
    navigate(`/order?strategyName=${encodeURIComponent(strategyName)}&id=2`);
  };

  return (
    <>
      <StyledHomeContainer>
        <Header />
        <StyledHomeMainContent>
          <Sidebar />
          <StyledHomeContent>
            {/* section 1 */}
            <StyledHomeSection>
              <StyledHead2Text>나의 전략 목록</StyledHead2Text>
              
              <StyledContentBlock style={{ width: "920px"}}>
              
                <div id="my-stategy"
                  style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  {data.strategyList.map((strategy, index) => (
                    <div
                      key={index}
                      id={strategy.id}
                      onClick={() => handleStrategyDetail(strategy.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <StrategyList
                        name={strategy.name}
                        createdAt={strategy.createdAt}
                        categoryNames={strategy.categoryList
                          .map((category) => category.categoryName)
                          .join(", ")}
                      />
                    </div>
                  ))}
                </div>
                {selectedStrategyData && (
                  // <LegendWithGraphDiv>
                  <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end",width:"100%",
                    padding:"20px", alignItems:"flex-start", gap:"20px",
                  }}>
                    <Button
              style={{"width":"200px",
                right:"10px"
                
              }} onClick={handleClick}
              >이 전략으로 매매하기</Button>
                     <section style={{
                      position:"relative",
                      width:"100%",display:"flex",justifyContent:"space-between"}}>
                      <CircularDiv>
                      <Circular top="17%" width="100%" height="100%" left="-12%" data={categoryData} />
                    </CircularDiv>
                    <LegendDiv style={{zIndex:"1000"}}>
                      <LegendListDiv fontSize="medium" width="100%">
                        {categoryData.map((category) => (
                          <div onClick={() => selectCategory(category)}>
                          <Legend key={category.label} category={category} />
                          </div>
                        ))}
                      </LegendListDiv>
                    </LegendDiv>
                    </section>
                    {curProductList && (
                      <StockTable
                        width="100%"
                        productList={curProductList.map((product) => ({
                          ...product,
                          ratio: product.ratio * 100, // ratio를 100을 곱해 퍼센트로 변환
                        }))}
                      />
                    )}

                  </div>
                )}

              </StyledContentBlock>
            </StyledHomeSection>
          </StyledHomeContent>
        </StyledHomeMainContent>
      </StyledHomeContainer>
    </>
  );
}




