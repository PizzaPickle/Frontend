import React, { useState } from "react";
import { StyledContentBlock, StyledHomeContainer, StyledHomeMainContent, StyledHomeContent, StyledHead2Text, StyledHeadText } from "../homePage/HomePage.style";
import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import html2canvas from "html2canvas";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setmydataURL } from "../../store/reducers/mydataurl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MydataScreen from "./MydataScreen";
import { Form } from 'react-bootstrap';
import { StyledCheckboxDiv, StyledMydataContainer, StyledMydataReqContainer } from "./RequestMydata.style";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RequestMydata() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickPrev = () => {
        navigate('/pblist')
      };

    //Login User 정보
    const { token } = useSelector((state) => state.user); 
    const userName = useSelector((state) => state.user.name);

    //마이데이터 요청
    const [error, setError] = useState(null);
    const [myBankdata, setMyBankdata] = useState([]);
    const [mySecdata, setMySecdata] = useState([]);
    const [myHousedata, setMyHousedata] = useState([]);
    const [myDebtdata, setMyDebtdata] = useState([]);


    const [slidesBankData,setSlidesBankData] = useState([]);
    const [balanceBankInfoData, setBalanceBankInfoData] = useState([]);

    const [slidesSecData,setSlidesSecData] = useState([]);
    const [balanceSecInfoData, setBalanceSecInfoData] = useState([]);

    const [slidesHouseData,setSlidesHouseData] = useState([]);
    const [balanceHouseInfoData, setBalanceHouseInfoData] = useState([]);
  
    const [slidesDebtData,setSlidesDebtData] = useState([]);
    const [balanceDebtInfoData, setBalanceDebtInfoData] = useState([]);

    //부동산 값 포맷
    function formatCurrency(value) {
        const isNegative = value < 0;
        const absoluteValue = Math.abs(value);
      
        const billions = Math.floor(absoluteValue / 100000000);
        const millions = Math.floor((absoluteValue % 100000000) / 10000);
      
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


    const getAssetMessage = () => {
        const selectedAssets = [];
        if (showBank) selectedAssets.push("은행");
        if (showDebt) selectedAssets.push("대출");
        if (showHouse) selectedAssets.push("부동산");
        if (showSec) selectedAssets.push("증권");

        const assetMessage = selectedAssets.length > 0
        ? `선택한 ${selectedAssets.join(", ")} 자산을 상담 정보로 같이 보낼까요?`
        : "자산 정보를 PB에게 보내지 않고 예약을 진행할까요?";
        return assetMessage;
    }

    //확인창
    const onClickMydataButton = () => {
        getAssetMessage();
        setShowModal(true);
    };


    //1. url->Blob->FormData변환
    const getImageBlob = async () => {

    const target = document.getElementById("mydata-screenshot");
    try {
    // target 크기 지정
    const { offsetWidth, offsetHeight } = target;
    target.style.width = `${offsetWidth}px`;
    target.style.height = `${offsetHeight}px`;

    const canvas = await html2canvas(target, {
        scale: 4, // 해상도 저하 이슈 해결
        backgroundColor: 'transparent' // 이미지 배경색 설정
    });

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    return reject("Blob 생성 실패");
                }
                const dataURL = canvas.toDataURL("image/png");
                // 이미지 확인을 위한 로컬 다운로드
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'screenshot.png'; 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                    
                const formData = new FormData();
                formData.append('image', blob, 'screenshot.png'); 
                console.log("1. blob 객체로 formData에 추가")
                
                
                for (let [key, value] of formData.entries()) {
                    if (value instanceof File) {
                    // 속성 확인
                        console.log(`${key}: ${value.name}, ${value.size} bytes, ${value.type}`);
                    } else {
                        console.log(`${key}: ${value}`);
                    }
                }
                resolve(formData);

                
            }, "image/png");
        });
    } catch (error) {
        console.log(error);
        alert("이미지 변환 중 오류가 발생했습니다.");
    }
    };


    //2. 서버에 이미지파일 전송
    const uploadImage = async (formData) => {
                        
        // for (let [key, value] of formData.entries()) {
        //     if (value instanceof File) {
        //     // 속성 확인
        //         console.log(`${key}: ${value.name}, ${value.size} bytes, ${value.type}`);
        //     } else {
        //         console.log(`${key}: ${value}`);
        //     }
        // }

        try {
          const response = await axios.post('/api/pickle-common/consulting/image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // FormData 전송을 위한 Content-Type 설정
              Authorization: `Bearer ${token}` // 필요한 경우 인증 토큰 추가
            },
          });
      
          console.log('파일 업로드 성공:', response.data);
          console.log(response.data.data)
          return response.data.data;
        } catch (error) {
          console.error('파일 업로드 실패:', error);
          throw error;
        }
      };



      // Modal 관리
      const [showModal, setShowModal] = useState(false);
      const handleYesClick = async() => {

        try {
        // TODO 마이데이터 파일 url저장 API POST 추가
        const formData = await getImageBlob();
        const myDataURL = await uploadImage(formData);
        console.log("마이데이터 업로드: ",myDataURL)
        dispatch(setmydataURL(myDataURL));
        navigate("/pblist/request");
        setShowModal(false); 

      } catch (error) {
        console.error("업로드 에러: ",error)
      }
    };

    
      const handleNoClick = () => {
        setShowModal(false);
      };

      const [showBank, setShowBank] = useState(true);
      const [showSec, setShowSec] = useState(true);
      const [showHouse, setShowHouse] = useState(true);
      const [showDebt, setShowDebt] = useState(true);
      const [selectAll, setSelectAll] = useState(false);
      const handleSelectAll = () => {
        const newValue = !selectAll;
        setSelectAll(newValue);
        setShowBank(newValue);
        setShowSec(newValue);
        setShowHouse(newValue);
        setShowDebt(newValue);
      };

      const updateSelectAll = () => {
        if (showBank && showSec && showHouse && showDebt) {
          setSelectAll(true);
        } else {
          setSelectAll(false);
        }
      };
    
      useEffect(() => {
        updateSelectAll();
      }, [showBank, showSec, showHouse, showDebt]);
    

      return (
        <StyledHomeContainer>
            <Header />
            <StyledHomeMainContent>
                <Sidebar />
                <StyledHomeContent style={{overflow:"hidden", padding:"40px"}}>
                    <div style={{width:"910px",display:"flex",justifyContent:"space-between", alignItems:"flex-end"}}>
                    <StyledHeadText>
                        {userName.slice(1)}님의 자산 상담에서 <br/>
                            필요한 정보를 PB에게 보내주세요.
                    <p style={{marginTop:"15px",fontSize:"small",fontWeight:"400"}}>※ 자산 정보를 보내지 않을 경우, PB는 내 자산에 대한 정보를 확인할 수 없습니다.</p>

                    </StyledHeadText>
                    
                    <div style={{display:"flex",gap:"10px"}}>
                    <Button 
                    id="goback"
                     onClick={onClickPrev}>돌아가기</Button>
                    <Button 
                    id="mydata-api"
                    onClick={onClickMydataButton}>다음으로</Button>
                    </div>

                    </div>
                    <StyledMydataReqContainer>

                    <StyledCheckboxDiv>

                        <Form>
                            <Form.Check
                            type="checkbox"
                            id="all-check"
                            label="전체"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            />
                            <div>

                            <Form.Check
                            type="checkbox"
                            id="bank-check"
                            label="은행"
                            checked={showBank}
                            onChange={() => {
                                setShowBank(!showBank);
                                if (selectAll && !showBank && !showSec && !showHouse && !showDebt) {
                                setSelectAll(false);
                                }
                                if (!selectAll && showBank && showSec && showHouse && showDebt) {
                                setSelectAll(true);
                                }
                            }}
                            />
                            <Form.Check
                            type="checkbox"
                            id="sec-check"
                            label="증권"
                            checked={showSec}
                            onChange={() => {
                                setShowSec(!showSec);
                                if (selectAll && !showBank && !showSec && !showHouse && !showDebt) {
                                setSelectAll(false);
                                }
                                if (!selectAll && showBank && showSec && showHouse && showDebt) {
                                setSelectAll(true);
                                }
                            }}
                            />
                            <Form.Check
                            type="checkbox"
                            id="house-check"
                            label="부동산"
                            checked={showHouse}
                            onChange={() => {
                                setShowHouse(!showHouse);
                                if (selectAll && !showBank && !showSec && !showHouse && !showDebt) {
                                setSelectAll(false);
                                }
                                if (!selectAll && showBank && showSec && showHouse && showDebt) {
                                setSelectAll(true);
                                }
                            }}
                            />
                            <Form.Check
                            type="checkbox"
                            id="debt-check"
                            label="대출"
                            checked={showDebt}
                            onChange={() => {
                                setShowDebt(!showDebt);
                                if (selectAll && !showBank && !showSec && !showHouse && !showDebt) {
                                setSelectAll(false);
                                }
                                if (!selectAll && showBank && showSec && showHouse && showDebt) {
                                setSelectAll(true);
                                }
                            }}
                            />
                            </div>
                        </Form>

                    </StyledCheckboxDiv>
                    
                    <StyledMydataContainer>


                    <div id="mydata-screenshot" style={{width:"fit-content",marginTop:"120px",height:"fit-content"}}>
                        {showBank && (
                            <StyledContentBlock style={{ backgroundColor: "transparent" }}>
                                {balanceBankInfoData && (
                                    <MydataScreen
                                        cardWidth={"220px"}
                                        maxWidth={"530px"}
                                        height={"250px"}
                                        showNum={2}
                                        bankTitle="은행"
                                        balanceInfo={balanceBankInfoData}
                                        slides={slidesBankData}
                                    />
                                )}
                            </StyledContentBlock>
                        )}
    
                        {showSec && (
                            <StyledContentBlock style={{ backgroundColor: "transparent" }}>
                                {balanceSecInfoData && (
                                    <MydataScreen
                                        cardWidth={"220px"}
                                        maxWidth={"530px"}
                                        height={"250px"}
                                        showNum={2}
                                        bankTitle="증권"
                                        balanceInfo={balanceSecInfoData}
                                        slides={slidesSecData}
                                    />
                                )}
                            </StyledContentBlock>
                        )}
    
                        {showHouse && (
                            <StyledContentBlock style={{ backgroundColor: "transparent" }}>
                                {balanceHouseInfoData && (
                                    <MydataScreen
                                        cardWidth={"220px"}
                                        maxWidth={"530px"}
                                        height={"250px"}
                                        showNum={2}
                                        bankTitle="부동산"
                                        balanceInfo={balanceHouseInfoData}
                                        slides={slidesHouseData}
                                    />
                                )}
                            </StyledContentBlock>
                        )}
    
                        {showDebt && (
                            <StyledContentBlock style={{ backgroundColor: "transparent" }}>
                                {balanceDebtInfoData && (
                                    <MydataScreen
                                        cardWidth={"220px"}
                                        maxWidth={"530px"}
                                        height={"250px"}
                                        showNum={2}
                                        bankTitle="대출"
                                        balanceInfo={balanceDebtInfoData}
                                        slides={slidesDebtData}
                                    />
                                )}
                            </StyledContentBlock>
                        )}
                    </div>
                    </StyledMydataContainer>
                    </StyledMydataReqContainer>
                </StyledHomeContent>
                <Modal id="custom-modal"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      show={showModal} onHide={handleNoClick}
                      backdropClassName="custom-backdrop" 
                      >

                      <Modal.Body id="modal-body">
                        {/* 마이데이터 전송 확인 메세지 */}
                        {getAssetMessage()}
                      </Modal.Body>
                      <Modal.Footer id="modal-footer">
                        <Button className="modal-no" variant="light" onClick={handleNoClick}>
                          No
                        </Button>
                        <Button className="modal-yes" variant="light" onClick={handleYesClick}>
                          Yes
                        </Button>
                      </Modal.Footer>
                    </Modal>
            </StyledHomeMainContent>
        </StyledHomeContainer>
    )
  };