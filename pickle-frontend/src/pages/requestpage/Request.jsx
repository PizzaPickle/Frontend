import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { StyledHomeContainer, StyledContentBlock, StyledHomeMainContent, StyledHeadText, StyledHomeContent, StyledPbCard } from "../Homepage/HomePage.style";
import { StyledOptionSelect, StyledRequestBoxDiv, StyledRequestDiv } from "./Request.style";
import { Button, Form } from "react-bootstrap";
import { StyledPbSection } from "../pblistpage/pblist.style";
import { Modal } from "react-bootstrap";

export default function Request() {
  //ISO 날짜 문자열 파싱
  function formatDate(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}년 ${month}월 ${day}일`;
  }
  function formatTime(isoString) {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${hours}시 ${minutes}분` 
  }
  
  // Modal 관리
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(true);
  }
  const handleYesClick = () => {
    
    // TODO 요청보내기 API 연동
  };

  const handleNoClick = () => {
    setShowModal(false);
  };
  
  // TODO
  // mydata 데이터 redux로 저장해서 유동자산(투자가능금액) 불러오기
  const mydataInvestPrice = 2100488000;

  const [showForm, setShowForm] = useState(true);
  const [showNewContent, setShowNewContent] = useState(false);

  const selectedPb = useSelector((state) => state.pb.selectedPb.username);
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const userName = useSelector((state) => state.user.name);
  const formatCurrency = (amount) => {
    return amount.toLocaleString() + '원';
  };

  let [investPrice, setInvestPrice] = useState('');
  let [income, setIncome] = useState('');
  let [whenToNeedMoney, setWhenToNeedMoney] = useState('');
  let [householdType, setHouseholdType] = useState(100);
  let [dependent, setDependent] = useState(100);
  let [investImp, setInvestImp] = useState(100);
  let [investLoss, setInvestLoss] = useState(100);

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
    // 전체를 응답하지 않은 경우 alert
    if (investPrice !== '' && income !== '' && whenToNeedMoney !== '' && householdType !== 100 && dependent !== 100 && investImp !== 100 && investLoss !== 100) {
      setShowForm(false);
      setShowNewContent(true);
    } else {
      alert("모든 항목에 응답해주세요.")
    }
  };


  // 상담 요청사항 작성 폼 최대 글자제한 state
  const [isError, setIsError] = useState(false);
  const handleSubmit = () => {
    e.preventDefault();
    if (text.length <= 500) {
      console.log("Submitted text:", consultText);
      // navigate()
    } else {
      setIsError(true);
    }
  }
  const [consultText, setConsultText] = useState('');
  const handleChange = (e) => {
    const newText = e.target.value;
    if (newText.length > 500) {
      setIsError(true);
    } else {
      setIsError(false);
      setConsultText(newText);
    }
  };


  // 투자금액은 천단위로 콤마 포맷팅
  const formatNumber = (num) => {
    if (!num) return '';
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const handleInputWithComma = (e) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(rawValue)) { 
    setInvestPrice(formatNumber(rawValue));
    }
  }
  const handleInputWithCommaPlus = () => {
    const rawValue = value.replace(/,/g, '');
    setInvestPrice(formatNumber(rawValue));
  };

  // 자금 필요시기는 최대 100년 후로 지정
  const handleWhenToNeedMoneyPlus = () => {
    if (parseInt(whenToNeedMoney, 10) > 80) {
      setWhenToNeedMoney('100');
    }
  };

  return (
    <StyledHomeContainer >
      <Header />
      <StyledHomeMainContent>
        <Sidebar />
        <StyledHomeContent style={{overflow:"auto"}}>
          <StyledPbSection  style={{margin:"20px"}}>
          {showForm ? (
            <>
          <StyledHeadText>
            예약이 확정되면, {userName.slice(1)}님만을 위한 상담이 준비됩니다.<br />
            {userName.slice(1)}님의 투자 성향을 함께 보내주세요.
          </StyledHeadText>

          <StyledRequestDiv>
              <StyledRequestBoxDiv>
                <StyledContentBlock style={{flex:"4"}}>
                <section>
                <Form>
                  <Form.Group controlId="formInvestPrice"
                   style={{padding: "10px"}}>
                    <h6>원하는 투자 금액을 입력해주세요.</h6>
                    <Form.Label style={{display:"flex", backgroundColor: "white", margin: "10px", padding: "20px", borderRadius: "20px"}}>
                    투자 가능 금액 {formatCurrency(mydataInvestPrice)} 중 투자할 금액
                    <Form.Control style={{width: "200px", height: "30px", border:"none",borderBottom: '1px solid gray',borderRadius: 0}}
                      type="text"
                      value={investPrice}
                      onChange={(e) => handleInputWithComma(e)}
                      onBlur={handleInputWithCommaPlus}
                      placeholder="ex. 250,000,000"
                      max="8"
                    />원
                    </Form.Label>

                  </Form.Group>
                  <Form.Group controlId="formIncome"
                  style={{padding: "10px"}}>
                  <h6>고정 수입을 입력해주세요.</h6>
                    <Form.Label  style={{display:"flex", backgroundColor: "white", margin: "10px", padding: "20px", borderRadius: "20px"}}>
                      안정적으로 들어오는 월 고정 수입
                    <Form.Control style={{width: "110px", height: "30px", border:"none",borderBottom: '1px solid gray',borderRadius: 0}}
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="ex. 300"
                    />만 원
                  </Form.Label>
                  </Form.Group>

                  <Form.Group controlId="formWhenToNeedMoney" 
                  style={{display:"flex", alignItems:"center", padding:"10px"}}>
                  <h6>자금 필요시기는</h6>
                    <Form.Label style={{display:"flex", backgroundColor: "white", margin: "10px", padding: "20px", borderRadius: "20px"}}>
                    <Form.Control style={{width: "70px", height: "30px", border:"none",borderBottom: '1px solid gray',borderRadius: 0}}
                      type="number"
                      value={whenToNeedMoney}
                      onChange={(e) => setWhenToNeedMoney(e.target.value)}
                      onBlur={handleWhenToNeedMoneyPlus} //최대 100년 후
                      placeholder="ex.3"
                      max="100"
                    />년 후
                    </Form.Label>
                  </Form.Group>
                </Form>
                </section>
                </StyledContentBlock>

                <StyledContentBlock style={{flex:"4"}}>
                  <StyledOptionSelect>
                  <section>
                    <h6>현재 가계 상황은</h6>
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
                  <h6>피부양자</h6>
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
                  <h6>투자할 때 중요한 것은</h6>
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

                  <section style={{display:"flex",flexDirection:"column",gap:"0px"}}>
                  <h6>포트폴리오에서 한 달 간 10%의 손실이 발생했다면,</h6>
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
            </StyledRequestBoxDiv>
            <section id="next-btn">
            <Button 
            onClick={handleRequest}>다음으로</Button>
            </section>
          </StyledRequestDiv>
          </>
  
          // 상담 요청사항 작성
          ) : showNewContent ? (
            <>
            <StyledHeadText>
            상담에 관한 요청 사항을 자유롭게 작성해주세요.
          </StyledHeadText>
              <StyledContentBlock style={{width:"80%",position:"relative"}}>
                <div className="container mt-4">
                <Form onSubmit={handleSubmit}
                >
                  <Form.Group controlId="formTextArea">
                    <Form.Control style={{"backgroundColor": "transparent",
                      "border": "none",
                      "marginBottom": "20px",
                    }}
                      as="textarea"
                      rows={5} 
                      value={consultText}
                      onChange={handleChange}
                      placeholder="500자 이내로 작성해주세요."
                      maxLength={500}
                      isInvalid={isError}
                    />
                  </Form.Group>
                </Form>
                
                  <Button variant="primary" type="submit"
                  onClick={handleClick}
                  style={{position:"absolute",right:"0",marginTop:"40px",width:"100px",padding:"10px"}}>
                    완료
                  </Button>

                  <Modal
                  id="custom-modal"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={showModal} onHide={handleNoClick}
                  backdropClassName="custom-backdrop" 
                  >
                    <Modal.Header id="modal-header">
                      <img src="/assets/request.svg" width={"90px"}></img>
                    <div style={{textAlign:"center"}}>
                    <b>예약 신청</b>
                      </div>
                    </Modal.Header>
                  <Modal.Body id="modal-body">
                    <div style={{display:"flex", justifyContent:"space-around", alignItems:"center", backgroundColor:"#FCFCFC", borderRadius:"10px",padding:"20px 20px 0px 20px"}}>
                      <div>
                        <p style={{fontWeight:"700",fontSize:"small"}}>예약할 PB <span style={{display:"flex",flexDirection:"column",fontWeight:"400",marginBottom:"5px"}}>{selectedPb}</span></p>
                        <p style={{fontWeight:"700",fontSize:"small"}}>상담일 <span style={{display:"flex",flexDirection:"column",fontWeight:"400",marginBottom:"5px"}}>{formatDate(selectedDate)}</span></p>
                        <p style={{fontWeight:"700",fontSize:"small"}}>상담시간 <span style={{display:"flex",flexDirection:"column",fontWeight:"400",marginBottom:"5px"}}>{formatTime(selectedDate)}</span></p>
                      </div>
                      <span>
                      <p><b>투자고려 금액</b> {investPrice}원</p>
                      <p><b>월 수입</b> {income}만원</p>
                      <p><b>자금필요 시기</b> {whenToNeedMoney}년 후</p>
                      <p><b>가계상황</b> {householdOptions[householdType]}</p>
                      <p><b>피부양자</b> {dependentOptions[dependent]}</p>
                      </span>
                    </div>
                    <br />
                    <p style={{display:"flex", flexDirection:"column", gap:"10px",fontSize:"0.7rem",padding:"20px 20px 20px 20px", backgroundColor:"#FCFCFC", borderRadius:"10px"}}>
                     <b>요청 사항</b> {consultText}</p>
                     
                      </Modal.Body>
                      <hr style={{color:"#e8e9eda0"}}></hr>
                      <div style={{textAlign:"center", marginTop:"10px"}}>
                    예약 신청을 완료할까요?
                      </div>
                      <Modal.Footer id="modal-footer">
                        <Button className="modal-no" variant="light" onClick={handleNoClick}>
                          No
                        </Button>
                        <Button className="modal-yes" variant="light" onClick={handleYesClick}>
                          Yes
                        </Button>
                      </Modal.Footer>
                    </Modal>
              </div>
              </StyledContentBlock>
          </>

          ) : null
          }

          </StyledPbSection>
        </StyledHomeContent>
      </StyledHomeMainContent>
    </StyledHomeContainer>
  );
}
