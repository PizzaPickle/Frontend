import React from "react"
import { useState } from "react"
import Header from "../../components/common/header/Header"
import Sidebar from "../../components/common/sidebar/Sidebar"
import { StyledHead2Text, StyledContentBlock, StyledHomeContainer, StyledHomeContent, StyledHomeMainContent, StyledHomeSection, StyledContentFlex } from "../Homepage/HomePage.style"
import { useSelector } from "react-redux"
import { StyledImageText, StyledMyBadge, StyledMyBadgeBox } from "./Mydata.style"
import locking from "/assets/mydata-locking.svg" 
import car from "/assets/mydata-car.png" 
import { LegendWithGraphDiv } from "../../components/common/graph-width-legend/LegendWithGraph.style"
import LegendWithGraph from "../../components/common/graph-width-legend/LegendWithGraph"
import Circular from "../../components/common/circular-graph/Circular"
import WalletCard from "../../components/common/wallet-card/WalletCard"

export default function Mydata(){  
    //Login User 정보
    const userId = useSelector((state) => state.user.id);
    const userName = useSelector((state) => state.user.name);

    //Badge-info 텍스트
    const locking_info = ["은행 잔액 대비 인출가능금액 30% 이하", "은행 적금 5000만원 이상"]

    let data = [
        {
          id: "해외주식",
          label: 2,
          value: 0.1,
          color: "#FFC27B",
          productList: [
            {
              code: "005930",
              ratio: 25,
              themeName: "반도체",
              name: "해외주식1",
            },
            {
              code: "000660",
              ratio: 75,
              themeName: "반도체",
              name: "해외주식2",
            },
          ],
        },
        {
          id: "채권",
          label: 3,
          value: 0.234,
          color: "#FF8B67",
          productList: [
            {
              code: "005930",
              ratio: 10,
              themeName: "반도체",
              name: "채권1",
            },
            {
              code: "000660",
              ratio: 90,
              themeName: "반도체",
              name: "채권2",
            },
          ],
        },
        {
          id: "ETF",
          label: 4,
          value: 0.404,
          color: "#FFADB6",
          productList: [
            {
              code: "005930",
              ratio: 40,
              themeName: "ETF1",
              name: "삼성전자",
            },
            {
              code: "000660",
              ratio: 60,
              themeName: "ETF2",
              name: "하이닉스",
            },
          ],
        },
        {
          id: "원자재",
          label: 5,
          value: 0.24,
          color: "#ffd9ad",
          productList: [
            {
              code: "005930",
              ratio: 44,
              themeName: "원자재1",
              name: "원자재1원자재1원자재1",
            },
            {
              code: "000660",
              ratio: 56,
              themeName: "원자재2",
              name: "하이닉스",
            },
          ],
        },
      ];
      
      let productList = [
        {
          code: "005930",
          ratio: 30,
          themeName: "반도체",
          name: "삼성전자",
        },
        {
          code: "000660",
          ratio: 70,
          themeName: "반도체",
          name: "하이닉스",
        },
      ];
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch("/api/mydata", {
                  method: "GET",
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
  
              if (!response.ok) {
                  const errorText = await response.text();
                  console.log(`네트워크 응답이 올바르지 않습니다: ${errorText}`);
                  setError("서버 응답 오류");
                  return;
              }
  
              const result = await response.json();
              console.log(result);
  
              // 1. 은행
              setMyBankdata(result.bank);
              const newSlidesBankData = result.bank.map((elem) => ({
                  bankName: elem.organizationName,
                  accountType: elem.productName,
                  productName: elem.bankProductType,
                  currentBalance: `잔액 ${elem.balanceAmount.toLocaleString()}원`,
              }));
              setSlidesBankData(newSlidesBankData);
  
              const newBalanceBankInfoData = [
                  { label: "총 잔액", amount: result.bankTotalAmount.toLocaleString()+"원"},
                  { label: "총 출금가능액", amount: result.bankWithdrawableAmount.toLocaleString()+"원" },
              ];
              setBalanceBankInfoData(newBalanceBankInfoData);
              console.log(balanceBankInfoData)

  
              // 2. 증권
              setMySecdata(result.securities);
              const newSlidesSecData = result.securities.map((elem) =>
                  elem.products.map((prod) => {
                      const profitAmount = prod.profitAmount;
                      const purchaseAmount = prod.purchaseAmount;
  
                      const profitPercentage = (profitAmount / purchaseAmount) * 100;
                      const formattedProfitPercentage = profitPercentage.toFixed(2);
  
                      // 조건부 + 기호 추가
                      const sign = profitPercentage >= 0 ? '+' : '';
                      const currentBalance = `${sign}${formattedProfitPercentage}%`;
  
                      return {
                          bankName: elem.organizationName,
                          accountType: "",
                          productName: prod.productName,
                          currentBalance: currentBalance,
                      };
                  })
              ).flat();
              console.log(newSlidesSecData);
              setSlidesSecData(newSlidesSecData);
  
              const newBalanceSecInfoData = [
                  { label: "총 잔액", amount: result.securitiesTotalAmount.toLocaleString()+"원" },
                  { label: "총 출금가능액", amount: result.securitiesTotalPurchaseAmount.toLocaleString()+"원" },
              ];
              setBalanceSecInfoData(newBalanceSecInfoData);
              console.log(balanceSecInfoData)

          
              // 3. 부동산
              setMyHousedata(result.housing);
              const newSlidesHouseData = result.housing.map((elem) => {
                const profitAmount = elem.profitAmount;
                const evalAmount = elem.evaluationAmount;
                console.log(evalAmount)
                // 조건부 + 기호 추가
                const sign = profitAmount>= 0 ? '+' : '';
                const currentBalance = `평가금액 ${formatCurrency(evalAmount)}원`
                const profitBalance = `(${sign}${formatCurrency(profitAmount)})`;

                return {
                  bankName: elem.address,
                  accountType: getHousingType(elem.housingType),
                  productName: currentBalance,
                  currentBalance: profitBalance
                }
                
              }
              );
              console.log(newSlidesHouseData);
              setSlidesHouseData(newSlidesHouseData);
  
              const newBalanceHouseInfoData = [
                  { label: "총 가치", amount: result.housingTotalAmount.toLocaleString()+"원" },
              ];
              setBalanceHouseInfoData(newBalanceHouseInfoData);
              console.log(balanceHouseInfoData)    
              

              // 4. 대출
              setMyDebtdata(result.debt);
              const newSlidesDebtData = result.debt.map((elem) => ({
                  bankName: elem.name,
                  accountType: `만기일: ${elem.expireDate}`,
                  productName: `잔여 ${formatCurrency(elem.remainAmount)}원 (총 ${formatCurrency(elem.principalAmount)}원)`,
                  currentBalance: `월 상환액 ${formatCurrency(elem.transAmount)}`,
              }));
              setSlidesDebtData(newSlidesDebtData);
  
              const newBalanceDebtInfoData = [
                  { label: "남은 총액", amount: result.debtRemainAmount.toLocaleString()+"원"},
                  { label: "총 대출금", amount: result.debtTotalAmount.toLocaleString()+"원" },
              ];
              setBalanceDebtInfoData(newBalanceDebtInfoData);
              console.log(balanceDebtInfoData)
              
  
          } catch (error) {
              console.log("데이터 요청 실패:", error.message);
              setError(error.message);
          }
      };
  
      fetchData();
  }, [token]);
  


    return (
        <>
        <StyledHomeContainer>
            <Header/>
            <StyledHomeMainContent>                
                <Sidebar/>
                <StyledHomeContent>
                    <StyledHead2Text>
                        {userName.slice(1)}님의 뱃지
                    </StyledHead2Text>

                    {/* section 1 */}
                    <StyledHomeSection>
                        <StyledContentBlock style={{position: "relative"}}>
                            <StyledMyBadgeBox>
                            {/* TODO map으로 뱃지 생성하기 */}
                            <StyledMyBadge
                            style={{background: "linear-gradient(#ffc85e 0%, #feffc0 100%)"}}
                            >                            
                            <img src={locking}></img>                    
                            </StyledMyBadge>
                            {/* TODO map으로 info 생성하기 */}
                            <div className="badge-info"
                            ><li className="badge-info-list">{locking_info[0]}</li>
                            <li className="badge-info-list">{locking_info[1]}</li>
                            </div>  
                            </StyledMyBadgeBox>
                        </StyledContentBlock>
                    </StyledHomeSection>

                    {/* section 2 */}
                    <StyledHomeSection>
                        <StyledHead2Text>
                            {userName.slice(1)}님의 자산 특성은?
                        </StyledHead2Text>
                    <StyledContentFlex>

                    <StyledContentBlock style={{position: "relative"}}>
                    <StyledImageText>                    
                    <img src={car}></img>
                    <span><p id="text">움직이는 현금차</p>
                    유동성의 특성이 강해요.</span>
                    </StyledImageText>
                    </StyledContentBlock>

                    <StyledContentBlock style={{position: "relative"}}>
                    <div style={{position: "relative", width:"200px"}}>
                    <Circular data={data} top={"20%"} left={"-15%"} width={"290px"} height={"235px"}></Circular>
                    <LegendWithGraph data={data} width={"300px"} left={"80%"} fontSize={"small"}></LegendWithGraph>
                    </div>
                    </StyledContentBlock>

                    <StyledContentBlock>
                    </StyledContentBlock>
                    </StyledContentFlex>
                    </StyledHomeSection>


                </StyledHomeContent>
                
            </StyledHomeMainContent>
        </StyledHomeContainer>
        </>
)
}