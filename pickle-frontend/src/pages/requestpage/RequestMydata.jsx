import React, { useState } from "react";
import { StyledHomeContainer, StyledHomeMainContent, StyledHomeContent, StyledHead2Text, StyledHeadText } from "../Homepage/HomePage.style";
import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import html2canvas from "html2canvas";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setmydataURL } from "../../store/reducers/mydataurl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function RequestMydata() {
  // TODO 
  // 버튼 눌러서 서버에 넘기고 받은 URL을 redux로 보관하기


  const mydataURL = useSelector((state) => state.mydataURL.mydataURL);
  // const dispatch = useDispatch();


  function dataURLtoBlob(dataURL) {
    // dataURL의 앞부분을 분리 (ex: "data:image/png;base64,")
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]); // base64 디코딩
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}
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

    //마이데이터 스크린샷 버튼
    const onClickMydataButton = () => {
        const target = document.getElementById("mydata-screenshot");
        if (!target) {
          return alert("요청서에 보내실 마이데이터를 선택해주세요.");
        }
        html2canvas(target).then((canvas) => {
          // 캡처된 이미지를 Data URL 형식으로 변환하여 상태에 저장
          const url = canvas.toDataURL("request-mydata/png");
          // dispatch(setmydataURL(url));
          getImageBlob();
        }).catch((error)=>{
          console.log(error)
            alert("저장 중 오류가 발생하였습니다.")
        });
        }

      //url->Blob->FormData변환
      const getImageBlob = async () => {

        const target = document.getElementById("mydata-screenshot");
        if (!target) {
            return alert("요청서에 보내실 마이데이터를 선택해주세요.");
        }

        try {
            const canvas = await html2canvas(target);

            return new Promise((resolve, reject) => {
                canvas.toBlob((blob) => {
                    if (!blob) {
                        return reject("Blob 생성 실패");
                    }

                    const formData = new FormData();
                    formData.append('file', blob, 'screenshot.png'); 
                    
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

    return (
        <StyledHomeContainer>
        <Header />
        <StyledHomeMainContent>
            <Sidebar />
        <StyledHomeContent>
        <StyledHeadText>
            마이데이터 전송 화면입니다.
        </StyledHeadText>
        <Button onClick={onClickMydataButton}>마이데이터를 요청서에 저장하기</Button>
        <div id="mydata-screenshot" style={{ width: '200px', height: '200px', backgroundColor: 'lightgray' }}>
                My Data Screenshot Area
            </div>
        <div>
        </div>
        </StyledHomeContent>
        </StyledHomeMainContent>
        </StyledHomeContainer>
    )

}