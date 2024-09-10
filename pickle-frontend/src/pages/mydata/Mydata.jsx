import React from "react"
import { useState } from "react"
import Header from "../../components/common/header/Header"
import Sidebar from "../../components/common/sidebar/Sidebar"
import { StyledHead2Text, StyledHeadText, StyledContentBlock, StyledHomeContainer, StyledHomeContent, StyledHomeMainContent, StyledHomeSection, StyledContentFlex } from "../homePage/HomePage.style"
import { useSelector } from "react-redux"
import { StyledImageText, StyledMyBadge, StyledMyBadgeBox, StyledMydataSection } from "./Mydata.style"
import locking from "/assets/mydata-locking.svg" 
import car from "/assets/mydata-car.png" 
import { LegendWithGraphDiv } from "../../components/common/graph-width-legend/LegendWithGraph.style"
import LegendWithGraph from "../../components/common/graph-width-legend/LegendWithGraph"
import Circular from "../../components/common/circular-graph/Circular"
import WalletCard from "../../components/common/wallet-card/WalletCard"
import { useEffect } from "react"
import AllMoney from "../../components/common/mydata/allmoney/AllMoney"

export default function Mydata(){  
    //Login User 정보
    const userId = useSelector((state) => state.user.id);
    const userName = useSelector((state) => state.user.name);
    const { token } = useSelector((state) => state.user); 

    //Badge-info 텍스트
    const locking_info = ["은행 잔액 대비 인출가능금액 30% 이하", "은행 적금 5000만원 이상"]

    //마이데이터 요청
    const [error, setError] = useState(null);
    const [myBankdata, setMyBankdata] = useState([]);
    const [mySecdata, setMySecdata] = useState([]);
    const [myHousedata, setMyHousedata] = useState([]);
    const [myDebtdata, setMyDebtdata] = useState([]);

    //부동산 값 포맷
    function formatCurrency(value) {
        const isNegative = value < 0;
        const absValue = Math.abs(value);
        
        const billions = Math.floor(absValue / 100000000);
        const millions = Math.floor((absValue % 100000000) / 10000);
      
        const billionPart = billions > 0 ? `${billions}억 ` : '';
        const millionPart = millions > 0 ? `${millions}만` : '';
      
        const formattedValue = `${billionPart}${millionPart}`.trim() || '0원';
        
        return isNegative ? `-${formattedValue}` : formattedValue;
      }
    //부동산 유형 포맷
    function getHousingType(type) {
          switch (type) {
              case '1':
                  return '토지';
              case '2':
                  return '건물';
              case '3':
                  return '아파트';
              case '4':
                  return '연립';
              case '5':
                  return '빌라';
              default:
                  return '기타'; // 디폴트값
          }
      }

    const [slidesBankData,setSlidesBankData] = useState([]);
    const [balanceBankInfoData, setBalanceBankInfoData] = useState([]);

    const [slidesSecData,setSlidesSecData] = useState([]);
    const [balanceSecInfoData, setBalanceSecInfoData] = useState([]);

    const [slidesHouseData,setSlidesHouseData] = useState([]);
    const [balanceHouseInfoData, setBalanceHouseInfoData] = useState([]);
 
    const [slidesDebtData,setSlidesDebtData] = useState([]);
    const [balanceDebtInfoData, setBalanceDebtInfoData] = useState([]);

    

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
  

  
  //   const slidesData = [
  //     {
  //         bankName: "은행기관1",
  //         accountType: "보통예금",
  //         productName: "예금상품명1",
  //         currentBalance: "현재잔액 100,000원"
  //     },
  //     {
  //         bankName: "은행기관2",
  //         accountType: "보통예금",
  //         productName: "예금상품명2",
  //         currentBalance: "현재잔액 200,000원"
  //     },
  //     {
  //         bankName: "은행기관3",
  //         accountType: "보통예금",
  //         productName: "예금상품명3",
  //         currentBalance: "현재잔액 300,000원"

  //     }
  // ];

  // const balanceInfoData = [
  //     { label: "총 잔액", amount: "356,439,000원" },
  //     { label: "총 출금가능금액", amount: "356,439,000원" }
  // ];

    return (
        <>
        <StyledHomeContainer>
            <Header/>
            <StyledHomeMainContent>                
                <Sidebar/>
                <StyledHomeContent>
                  <StyledMydataSection>
                    <StyledHeadText style={{margin:"10px 0px 25px 0px"}}>
                    마이 자산 데이터
                    </StyledHeadText>


                    {/* section 1 */}
                    <StyledHomeSection>
    
                      <StyledHead2Text>
                          획득한 자산 뱃지
                      </StyledHead2Text>
                        <StyledContentBlock style={{position: "relative", width:"fit-content"}}>
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
                            {userName.slice(1)}님의 자산을 모아봤어요.
                        </StyledHead2Text>
                    <StyledContentFlex style={{"flexWrap":"wrap"}}>

                    {/* <StyledContentBlock style={{position: "relative"}}>
                    <StyledImageText>                    
                    <img src={car}></img>
                    <span><p id="text">움직이는 현금차</p>
                    유동성의 특성이 강해요.</span>
                    </StyledImageText>
                    </StyledContentBlock> */}

                    {/* <StyledContentBlock style={{position: "relative"}}>
                    <div style={{position: "relative", width:"200px"}}>
                    <Circular data={data} top={"20%"} left={"-15%"} width={"290px"} height={"235px"}></Circular>
                    <LegendWithGraph data={data} width={"300px"} left={"80%"} fontSize={"small"}></LegendWithGraph>
                    </div>
                    </StyledContentBlock> */}

                    <StyledContentBlock>
                    {balanceBankInfoData && (
                    <AllMoney 
                    cardWidth={"220px"}
                    maxWidth={"530px"}
                        height={"250px"}
                        showNum={2}
                        bankTitle="은행"
                        balanceInfo={balanceBankInfoData}
                        slides={slidesBankData}
                    />
                    )
                    }   
                    </StyledContentBlock>
                    <StyledContentBlock>
                    {balanceSecInfoData && (
                    <AllMoney 
                    cardWidth={"220px"}
                    maxWidth={"530px"}

                        height={"250px"}
                        showNum={2}
                        bankTitle="증권"
                        balanceInfo={balanceSecInfoData}
                        slides={slidesSecData}
                    />
                    )
                    }   
                    </StyledContentBlock>

                    <StyledContentBlock>
                    {balanceHouseInfoData && (
                    <AllMoney 
                    cardWidth={"220px"}
                    maxWidth={"530px"}

                        height={"250px"}
                        showNum={2}
                        bankTitle="부동산"
                        balanceInfo={balanceHouseInfoData}
                        slides={slidesHouseData}
                    />
                    )
                    }   
                    </StyledContentBlock>

                    <StyledContentBlock>
                    {balanceDebtInfoData && (
                    <AllMoney 
                    cardWidth={"220px"}
                    maxWidth={"530px"}

                        height={"250px"}
                        showNum={2}
                        bankTitle="대출"
                        balanceInfo={balanceDebtInfoData}
                        slides={slidesDebtData}
                    />
                    )
                    }   
                    </StyledContentBlock>

                    </StyledContentFlex>
                    </StyledHomeSection>

                    </StyledMydataSection>
                </StyledHomeContent>
            </StyledHomeMainContent>
        </StyledHomeContainer>
        </>
)
}