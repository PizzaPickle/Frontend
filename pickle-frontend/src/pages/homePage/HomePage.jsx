import React from "react";
import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import AllMoney from "../../components/common/mydata/allmoney/AllMoney";
import WalletCard from "../../components/common/wallet-card/WalletCard";
import { AllMoneyTitle, StyledContentFlex, StyledS1Text, StyledHomeContainer, StyledHomeContent, StyledHomeMainContent, StyledHeadText, StyledHomeSection, StyledContentBlock, StyledHead2Text, StyledPbCard, StyledAllMoneyContainer } from "./HomePage.style";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logoutUser } from "../../store/reducers/user";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage(){    
    const [requestNum,setRequestNum] = useState(0);

    // 계좌에 든 게 없어서 .. ui 화면을 위해 초기값 넣어둘게요
    const [walletData, setWalletData] = useState({
        accountId: 123,
	    accountNumber: "123-456789-01-001",
	    balance: 49900, //예수금
	    totalAmount: 23482000, //총매입금액
});
    const [productData, setProductData] = useState(
        [
            {
                "accountId": 12341243,
                "productName": "삼성전자",
                "productCode": "005930",
                "heldQuantity": 34, 
                "purchaseAmount": 34,
                "evaluationAmount": 78900, //평가금액
                "profitAmount": 75600, //(평가)손익금액
                "profitMargin": 0.35,
                "categoryName": "국내주식", 
                "themeName": "반도체"
            },
            {
                "accountId": 1234513,
                "productName": "Apple",
                "productCode": "APPL",
                "heldQuantity": 34,
                "purchaseAmount": 34,
                "evaluationAmount": 78900,
                "profitAmount": 75600,
                "profitMargin": 2.34,
                "categoryName": "해외주식",
                "themeName": "IT"
            }
        ]        
    );

    // TODO 투자여유금액 계산 API 요청
    const possibleAmount = 23325234;

    
    //TODO
    const consultPB = "윤재욱";

    //Login User 정보
    const userId = useSelector((state) => state.user.id);
    const userName = useSelector((state) => state.user.name);
    // const { token } = useSelector((state) => state.user); 
    // const token = localStorage.getItem('token'); 

    const now = new Date();
    const consultDate = new Date(); //!! 상담일자로 변경해야 함
    consultDate.setDate(consultDate.getDate()-2);
    const Dday = Math.floor((now - consultDate) / (1000 * 60 * 60 * 24));
    
    const dateString = consultDate.toLocaleDateString();
    const timeString = consultDate.toLocaleTimeString();
    const [consultYear, consultMonth, consultDay] = dateString.split('.');
    const [consultHour, consultMin, consultSec] = timeString.split(':');


    //내 자산 지갑
    const walletTexts = ["내 잔액", "총 매입금액", "투자여유금액"]
    const walletAmounts = [walletData.accountNumber,walletData.balance,walletData.totalAmount,possibleAmount]

    const slidesData = [
        {
            bankName: "국내주식",
            // productName: "예금상품명1",
            currentBalance: "+3.1%"
        },
        {
            bankName: "ETF",
            // productName: "예금상품명2",
            currentBalance: "+3.1%"
        },
        {
            bankName: "채권",
            // productName: "예금상품명3",
            currentBalance: "+3.1%"
        }
    ];

    const balanceInfoData = [
        { label: "none ", amount: " none" },
        { label: "none ", amount: " none" },
    ];

    
    useEffect(() => {
        const fetchData = async () => {
            try {

                const token = localStorage.getItem('accessToken'); 
                const response = await fetch('/api/pickle-customer/my-asset', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('네트워크 에러');
                }

                const result = await response.json();

                setWalletData(result.data);

            } catch (error) {
                console.error("fetch 실패: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchProductData = async () => {
            try {

                const token = localStorage.getItem('accessToken'); 
                const response = await fetch('/api/pickle-customer/my-products', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!response.ok) {
                    throw new Error('네트워크 에러');
                }
    
                const result = await response.json();
                setProductData(result.data);
    
            } catch (error) {
                console.error("fetch 실패: ", error);
            }
        };
    
        fetchProductData();
    }, []);

    useEffect(() => {

        const fetchData = async () => {
          try {
            const token = localStorage.getItem('accessToken'); 
            const response = await fetch(`/api/pickle-common/consulting/customer/request-letters?status=1`, {
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
    
            setRequestNum(result.data.length);
            console.log(result.data.length);
    
    
          } catch (error) {
            console.log("데이터 요청 실패:", error.message);
            setError(error.message);
          }
        };
    
        fetchData();
    
      }, []);

    // 애니메이션 효과 적용
    const pageAnimation = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 2 } },
        exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
    };

    const delayedTextAnimation = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 1.2, delay: 1.9 }  // Added delay of 0.5 seconds
        },
        exit: { opacity: 0, y: -50, transition: { duration: 1.2 } },
      };

    const delayedTextAnimation2 = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 1.2, delay: 3.2 }  // Added delay of 0.5 seconds
    },
    exit: { opacity: 0, y: -50, transition: { duration: 1.2 } },
    };

    const bellShakeAnimation = {
        hidden: { rotate: 0 },
        visible: {
          rotate: [0,-10, 10, -10, 7, -7, 5, -5, 0], // 종이 좌우로 흔들리는 각도
          transition: {
            duration: 2.5, // 애니메이션 지속 시간
            ease: 'easeInOut', // 애니메이션의 가속도 설정
          },
        },
      };

    return (
        <StyledHomeContainer>
            <Header />
            <StyledHomeMainContent>
                    <Sidebar />
                <StyledHomeContent>

                    {/* section 1 */}
                    <StyledHomeSection> 
                    <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={pageAnimation}
                >
                    <StyledHeadText>
                        {userName.slice(1)}님, 환영합니다.
                    </StyledHeadText>

                    </motion.div>
                        <article>
                        <StyledContentBlock>
                            <StyledS1Text>
                            <motion.img
                                src="/assets/home-bell.svg" // 종 이미지 경로
                                alt="bell"
                                initial="hidden"
                                animate="visible"
                                variants={bellShakeAnimation}
                                style={{ width: "50px", height: "50px" }} // 이미지 크기 설정
                                />
                                <span><div style={{marginBottom: "0px"}}>예정된 상담 일정</div><hr></hr></span>
                                <div style={{marginBottom: "0px", fontWeight: "700"}}>D-{Dday}</div>
                                <section>
                                    <div style={{marginBottom: "0px"}}>{consultYear}년 {consultMonth}월 {consultDay}일</div>
                                    <div style={{marginBottom: "0px"}}>{consultHour}시 {consultMin}분</div>
                                    <div style={{marginBottom: "0px"}}>{consultPB}PB</div>
                                </section>
                                <img src="/assets/home-next.svg"></img>
                            </StyledS1Text>
                        </StyledContentBlock>
                        <StyledContentBlock>
                            <StyledS1Text>
                                    <div>내가 보낸 요청</div>
                                    <span><div>{requestNum}건</div></span>                               
                                    <Link to="/myrequest"><img src="/assets/home-next.svg" style={{marginLeft:"8px"}}></img></Link>
                            </StyledS1Text>
                        </StyledContentBlock>
                        </article>
                    </StyledHomeSection>

                    {/* section 2 */}
                    <StyledHomeSection>
                    <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={delayedTextAnimation}
                    >
                    <StyledHead2Text>
                     나의 투자 현황을 살펴보세요.
                    </StyledHead2Text>
                    </motion.div>
                    
                    <StyledContentFlex style={{alignItems:"center"}}>
                        <WalletCard texts={walletTexts} amounts={walletAmounts} />
                        <StyledAllMoneyContainer>
                            <AllMoneyTitle>내 포트폴리오 수익률
                                <div>+5.1%</div>
                            </AllMoneyTitle>
                            <AllMoney 
                            gap={"15px"}
                            infoVisible={"hidden"}
                                maxWidth={"1000px"}
                                height={"250px"}
                                padding={"50px"}
                                showNum={3}
                                balanceInfo={balanceInfoData}
                                slides={slidesData}
                                listWidth={"630px"}
                                cardWidth={"200px"}
                                lastTextSize={"large"}
                                lastTextColor={"#FF5C00"} /* TODO 데이터에 따라 수정 필요 */
                                auto={"true"}
                            />
                        </StyledAllMoneyContainer>
                    </StyledContentFlex>
                    </StyledHomeSection>

                    
                    {/* section 3 */}
                    <StyledHomeSection> 
                        <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={delayedTextAnimation2}
                        >
                        <StyledHead2Text>
                        믿을 수 있는 PB를 만나보세요.
                        </StyledHead2Text>
                        </motion.div>
                        <StyledContentFlex>                        
                            <StyledPbCard>
                                <Link to={'/pblist'}>
                                <div>
                                ETF잘알<br/>
                                PB
                                </div>
                                <img src="/assets/home-pb1.svg"></img>
                                </Link>
                            </StyledPbCard>
                            <StyledPbCard style={{backgroundColor: "#FFDF6F"}}>
                                <Link to={'/pblist'}>
                                <div>
                                국장 전문<br/>
                                PB
                                </div>
                                <img src="/assets/home-pb2.svg"></img>
                                </Link>
                            </StyledPbCard>
                            <StyledPbCard style={{backgroundColor: "#F8ADFF"}}>
                                <Link to={'/pblist'}>
                                <div>
                                미장 전문<br/>
                                PB
                                </div>
                                <img src="/assets/home-pb3.svg"></img>
                                </Link>
                            </StyledPbCard>
                        </StyledContentFlex>
                    </StyledHomeSection>
                </StyledHomeContent>
            </StyledHomeMainContent>
        </StyledHomeContainer>
    )
};