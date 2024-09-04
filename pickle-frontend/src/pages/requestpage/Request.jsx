import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { StyledHomeContainer, StyledContentBlock, StyledHomeMainContent, StyledHeadText, StyledHomeContent, StyledPbCard } from "../Homepage/HomePage.style";
import { StyledOptionSelect, StyledRequestDiv } from "./Request.style";
import { Button, Form } from "react-bootstrap";
import { StyledPbSection } from "../pblistpage/pblist.style";

export default function Request() {
  // TODO
  // mydata 데이터 redux로 저장해서 유동자산(투자가능금액) 불러오기
  const mydataInvestPrice = 2100488000;

  const selectedPb = useSelector((state) => state.pb.selectedPb);
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const userName = useSelector((state) => state.user.name);
  const formatCurrency = (amount) => {
    return amount.toLocaleString() + '원';
  };

  let [investPrice, setInvestPrice] = useState('');
  let [income, setIncome] = useState('');
  let [whenToNeedMoney, setWhenToNeedMoney] = useState('');
  let [householdType, setHouseholdType] = useState(0);
  let [dependent, setDependent] = useState(0);
  let [investImp, setInvestImp] = useState(0);
  let [investLoss, setInvestLoss] = useState(0);

  // 선택 가능한 옵션
  const householdOptions = ['외벌이','맞벌이','은퇴함','자영업'];
  const dependentOptions = ['있음', '없음'];
  const investImpOptions = ['손해를 줄이는 것','수익을 늘리는 것','둘 사이 어딘가'];
  const investLossOptions = ['전부 판다','일부를 판다','그대로 보유할 것이다','오히려 더 투자한다'];

  const handleHouseholdSelect = (index) => {
    setHouseholdType(index);
    console.log("가계상황",index)
  };
  const handleDependentSelect = (index) => {
    setDependent(index);
    console.log("피부양자",index)
  }
  const handleInvestImpSelect = (index) => {
    setInvestImp(index);
    console.log("투자중요",index)
  }
  const handleInvestLossSelect = (index) => {
    setInvestLoss(index);
    console.log("포폴손실",index)
  }


  const handleRequest = () => {
    console.log("투자가격", investPrice, "고정수입", income, "자금필요시기", whenToNeedMoney,
      "가계상황", householdType, "피부양자", dependent, "투자중요", investImp, "포폴손실", investLoss
    );
  };

  const formatNumber = (num) => {
    if (!num) return '';
    // 숫자형태로 변환 후 콤마를 추가
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleInputWithComma = (e) => {
    const rawValue = e.target.value.replace(/,/g, ''); // 콤마 제거
    if (/^\d*$/.test(rawValue)) {  // 숫자가 아닌 경우
    setInvestPrice(formatNumber(rawValue));
    }
  }
  const handleInputWithCommaPlus = () => {
    // 포커스가 벗어날 때도 콤마로 포맷팅
    const rawValue = value.replace(/,/g, '');
    setInvestPrice(formatNumber(rawValue));
  };

  return (
    <StyledHomeContainer>
      <Header />
      <StyledHomeMainContent>
        <Sidebar />
        <StyledHomeContent>
          <StyledPbSection>
          <StyledHeadText>
            예약이 확정되면, {userName.slice(1)}님만을 위한 상담이 준비됩니다.<br />
            {userName.slice(1)}님의 투자 성향을 함께 보내주세요.
          </StyledHeadText>

          <StyledRequestDiv>
            <StyledContentBlock style={{flex:"4"}}>
            <section >
            <Form >
              <Form.Group controlId="formInvestPrice">
                원하는 투자 금액을 입력해주세요.
                <Form.Label style={{display:"flex"}}>
                투자 가능 금액 {formatCurrency(mydataInvestPrice)} 중 투자할 금액
                <Form.Control style={{width: "200px"}}
                  type="text"
                  value={investPrice}
                  onChange={(e) => handleInputWithComma(e)}
                  onBlur={handleInputWithCommaPlus}
                  placeholder="ex. 250000000"
                  max="8"
                />원
                </Form.Label>

              </Form.Group>
              고정 수입을 입력해주세요.
              <Form.Group controlId="formIncome">
                <Form.Label  style={{display:"flex"}}>
                  안정적으로 들어오는 월 고정 수입
                <Form.Control style={{width: "200px"}}
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="소득을 입력하세요"
                />만 원
              </Form.Label>
              </Form.Group>

              <Form.Group controlId="formWhenToNeedMoney">
                <Form.Label style={{display:"flex"}}>자금 필요시기는
                <Form.Control style={{width: "200px"}}
                  type="number"
                  value={whenToNeedMoney}
                  onChange={(e) => setWhenToNeedMoney(e.target.value)}
                  placeholder="자금 필요 시점을 입력하세요"
                  step="1000"
                />년 후
                </Form.Label>
              </Form.Group>
            </Form>
            </section>
            </StyledContentBlock>

            <StyledContentBlock style={{flex:"4"}}>
              <StyledOptionSelect>
              <section>
              <div className="option-first">
              {householdOptions.map((opt,ind)=>{
                  console.log(householdType === ind)
                return (
                  <div className={householdType === ind ? 'selected' : 'option'}
                  key={ind}
                  onClick={()=>handleHouseholdSelect(ind)}
                  > <p style={{"marginBottom":"0"}}>{opt}</p>
                </div>
                )
              })}
              </div>
              </section>
              <section>
              <div className="option-second">

              {dependentOptions.map((opt,ind)=>{
                return (
                  <div className={dependent === ind ? 'selected' : 'option'}
            
                  key={ind}
                  onClick={()=>handleDependentSelect(ind)}
                  > <p style={{"marginBottom":"0"}}>{opt}</p>
                </div>
                )
              })}
              </div>
              </section>
              <section>
              <div className="option-third">
              {investImpOptions.map((opt,ind)=>{
                return (
                  <div className={investImp === ind ? 'selected' : 'option'}
            
                  key={ind}
                  onClick={()=>handleInvestImpSelect(ind)}
                  > <p style={{"marginBottom":"0"}}>{opt}</p>
                </div>
                )
              })}
              </div>
              </section>

              <section>
              <div className="option-fourth">
              {investLossOptions.map((opt,ind)=>{
                return (
                  <div className={investLoss === ind ? 'selected' : 'option'}
            
                  key={ind}
                  onClick={()=>handleInvestLossSelect(ind)}
                  > <p style={{"marginBottom":"0"}}>{opt}</p>
                </div>
                )
              })}
              </div>
              </section>
              </StyledOptionSelect>
            </StyledContentBlock>
          </StyledRequestDiv>
          <Button onClick={handleRequest}>다음으로</Button>
          </StyledPbSection>
        </StyledHomeContent>
      </StyledHomeMainContent>
    </StyledHomeContainer>
  );
}
