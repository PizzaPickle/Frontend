import React, { useState, useEffect } from "react";
import Header from "../../components/common/header/Header";
import { StyledHomeContainer, StyledHomeMainContent, StyledHomeContent, StyledContentBlock } from "../homePage/HomePage.style";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { StyledHeadText } from "../homePage/HomePage.style";
import { StyledDateButton, StyledPbSection, StyledPbCard, StyledPbontainer, StyledReserveContainer, StyledPbSelectContainer, StyledFilterImg, StyledFilterResult } from "./pblist.style";
import { Modal, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPb } from "../../store/reducers/pbselect";
import { setDate } from "../../store/reducers/dateselect";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { motion } from "framer-motion";
import { ReserveListContainer, ReserveItem, ReserveDate, NextButton } from "./pblist.style";

export default function Pblist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleMouseEnter2 = () => setIsHovered2(true);
  const handleMouseLeave2 = () => setIsHovered2(false);
  
  const [pbData, setPbData] = useState([]);
  const [error, setError] = useState(null);
  const selectedPb = useSelector((state) => state.pb.selectedPb);
  const [showSelectedPb, setShowSelectedPb] = useState(false);
  const { token } = useSelector((state) => state.user); 
  const [tmpDate, setTmpDate] = useState(null);

  const [selectedMainFields, setSelectedMainFields] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // 필터링된 데이터
  const filteredData = pbData.filter((pb) => {
    const mainFieldMatch = selectedMainFields.length === 0 || selectedMainFields.every((field) => pb.mainFields.includes(field));
    const tagMatch = selectedTags.length === 0 || selectedTags.every((tag) => pb.tags.includes(tag));
    return mainFieldMatch && tagMatch;
  });

  // PB 선택 체크 모달창
  const [clickedPb, setClickedPb] = useState(null); // 클릭된 PB 정보 저장
  const [showModal, setShowModal] = useState(false);

    const handlePbClick = (pb) => {
      console.log("clickedPb에 저장하는 pb:",pb)
      setClickedPb(pb); // 클릭된 PB 저장
      setShowModal(true);
  };


  const handleYesClick = () => {
    if(clickedPb) {    
      console.log(clickedPb)
      dispatch(setPb(clickedPb)); //선택 pb 저장
      setShowSelectedPb(true);
      setShowModal(false); // 모달 닫기
    }
    else {
      alert("에러가 발생하였습니다. 다시 시도해주세요.")
    }
  };

  const handleNoClick = () => {
    setShowModal(false);
  };

  const handleDatePick = (date) => {
    console.log("선택한 날짜: ", date)
    setTmpDate(date)
  }
  
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleReqWrite = () => {

    const now = new Date();
    
    if (tmpDate !== null && tmpDate < now) {
      alert('현재 시간 이후 시간대만 예약 가능합니다.');
    }

    else if (tmpDate !== null && selectedPb !== null) {
      dispatch(setDate(tmpDate.toISOString())); //선택 날짜 저장 (ISO문자열로 변환)
      navigate('/pblist/consultdata')
    }
  }

  // 최소 날짜를 오늘로 설정
  const today = new Date(new Date().setDate(new Date().getDate()));
  // 최대 날짜를 오늘로부터 27주 후로 설정
  const sixMonthLater = new Date(new Date().setDate(new Date().getDate() + 189));
  

  // 다중 선택 핸들러
  const handleMainFieldChange = (eventKey) => {
    setSelectedMainFields((prevSelectedFields) =>
      prevSelectedFields.includes(eventKey)
        ? prevSelectedFields.filter((field) => field !== eventKey)
        : [...prevSelectedFields, eventKey]
    );
  };

  const handleTagChange = (eventKey) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(eventKey)
        ? prevSelectedTags.filter((tag) => tag !== eventKey)
        : [...prevSelectedTags, eventKey]
    );
  };

  //pb list 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/pickle-pb/pblist", {
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
        setPbData(result.data);
      } catch (error) {
        console.log("데이터 요청 실패:", error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, [token]);

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

    // 카드 hover 시 애니메이션 정의
  const hoverEffect = {
    hidden: { y: 0, scale: 1 },
    hover: { y: -5, scale: 1 }, // 살짝 위로 올라가고 약간 확대됨
  };


  return (
    <StyledHomeContainer>
      <Header />
      <StyledHomeMainContent>
        <Sidebar />
        <StyledHomeContent style={{padding:"40px"}}>
          <StyledPbSection>
            {!showSelectedPb && (
              <div>
                <StyledHeadText>나에게 맞는 PB를 만나보세요.</StyledHeadText>
                {/* 필터링 옵션 */}
                <div className="filtering">
                  <StyledContentBlock 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundColor: isHovered ? '#E7ECF9' : '#F1F5FF',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    position:"relative", gap: "0",padding:"5px", cursor:"pointer"}}>
                    <StyledFilterImg>
                    <img
                    style={{width:"17px",zIndex:"100",marginLeft:"10px"}}
                    src="/assets/filter-mainsector.svg"></img>
                    <DropdownButton
                      id="custom-dropdown"
                      title="주력 분야"
                      onSelect={handleMainFieldChange}
                    >
                      <Dropdown.Item eventKey="국내주식">국내주식</Dropdown.Item>
                      <Dropdown.Item eventKey="해외주식">해외주식</Dropdown.Item>
                      <Dropdown.Item eventKey="채권">채권</Dropdown.Item>
                    </DropdownButton>
                    </StyledFilterImg>
                  </StyledContentBlock>

                  <StyledContentBlock
                  onMouseEnter={handleMouseEnter2}
                  onMouseLeave={handleMouseLeave2}
                  style={{
                    backgroundColor: isHovered2 ? '#E7ECF9' : '#F1F5FF',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    position:"relative", gap: "0",padding:"5px", cursor:"pointer"}}>
                  <StyledFilterImg>
                    <img 
                    style={{width:"16px",zIndex:"100",marginLeft:"10px"}}
                    src="/assets/filter-interest.svg">
                    </img>
                    <DropdownButton
                      id="custom-dropdown"
                      title="관심 토픽"
                      onSelect={handleTagChange}
                    >
                      <Dropdown.Item eventKey="연금">연금</Dropdown.Item>
                      <Dropdown.Item eventKey="노후자금">노후자금</Dropdown.Item>
                      <Dropdown.Item eventKey="ETF">ETF</Dropdown.Item>
                      <Dropdown.Item eventKey="중개형 ISA">중개형 ISA</Dropdown.Item>
                      <Dropdown.Item eventKey="결혼자금 설계">결혼자금 설계</Dropdown.Item>
                    </DropdownButton>
                    </StyledFilterImg>
                    </StyledContentBlock>
                    
                    <StyledFilterResult>
                      {selectedMainFields.map((field, index) => (
                        <div key={index} className="label1">
                          {field} <Button id="x-btn" variant="link" onClick={() => handleMainFieldChange(field)}><div style={{fontSize:"0.8rem",fontWeight:"600", color:"#D5CDF2"}}>X</div></Button>
                        </div>
                      ))}
                    </StyledFilterResult>
  
                    <StyledFilterResult>
                      {selectedTags.map((tag, index) => (
                        <div key={index} className="label2">
                          {tag} <Button  id="x-btn" variant="link" onClick={() => handleTagChange(tag)}><div style={{fontSize:"0.8rem",fontWeight:"600", color:"#D5CDF2"}}>X</div></Button>
                        </div>
                      ))}
                    </StyledFilterResult>
                </div>              </div>
            )}

            {error && <p>에러: {error}</p>}

            <StyledPbontainer className="PbContainer">
              {showSelectedPb && selectedPb ? (
                <StyledPbSelectContainer>
                  <StyledHeadText>
                    상담을 원하는 날짜를 선택해주세요.
                  </StyledHeadText>
                  <section style={{"gap":"50px","width":"100%"}}>
                    <StyledPbCard>
                      {selectedPb.img && (
                        <img src={selectedPb.img} alt={`${selectedPb.username} 이미지`} />
                      )}
                      <section className="self-introduce">
                        <div id="name">{selectedPb.username}PB</div>
                        <div id="location">
                          <img src="/assets/pb-location.svg" alt="location" />
                          {selectedPb.branchOffice}
                        </div>
                        <div id="introduction">{selectedPb.introduction}</div>
                      </section>
                      <section className="sector">
                      <article className="mainfield">
                        <p>주력 분야</p>
                          {selectedPb.mainFields.map((field, i) => (
                            <div id="mainfields" key={i}>{field}</div>
                          ))}
                      </article>

                      <article className="topics">
                        <p>관심 토픽</p>
                        {selectedPb.tags.map((topic, i) => (
                          <div id="interests" key={i}>{topic}</div>
                        ))}
                      </article>

                      <article className="ports">
                        <p>주 포트폴리오 자산군</p>
                        <div id="price">{selectedPb.minConsultingAmount}만원 이상</div>
                      </article>
                    </section>
                    </StyledPbCard>

                    <StyledReserveContainer>
                      
                      <div className="DatePick" style={{"width":"90%"}}>
                        <DatePicker
                        style={{"width":"100%"}}
                          onChange={(date) => handleDatePick(date)}
                          dateFormat="yyyy년 MM월 dd일 a hh시 mm분"
                          dateFormatCalendar="yyyy년 MM월"
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="상담 시간"
                          selected={tmpDate}
                          minDate={today}
                          maxDate={sixMonthLater}
                          open="open"
                        />
                      </div>
                      <StyledDateButton
                          style={{
                            opacity: tmpDate ? 1 : 0,
                            transition: 'opacity 0.2s ease-in-out',
                            pointerEvents: tmpDate ? 'auto' : 'none' // 클릭 방지를 위해
                          }}
                        >
                  <ReserveListContainer id="listcontainer"
                  style={{alignItems:"flex-start",gap:"10px"}}>
                        <ReserveItem>
                          <ReserveDate>예약 날짜</ReserveDate>
                        </ReserveItem>
                        <ReserveItem>
                          {formatDate(tmpDate) + " "}
                          {formatTime(tmpDate)}
                          <NextButton onClick={handleReqWrite}>
                            <img src="/assets/next.svg" alt="Next" />
                          </NextButton>
                        </ReserveItem>
                      </ReserveListContainer>
                        </StyledDateButton>
                    </StyledReserveContainer>

                  </section>
                </StyledPbSelectContainer>
              ) : (
                filteredData.length > 0 &&
                !showSelectedPb &&
               filteredData.map((pb, i) => (
                <motion.div
                  initial="hidden"
                  whileHover="hover" // hover 시 효과 적용
                  variants={hoverEffect} // 애니메이션 적용
                  style={{
                    display: 'inline-block',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 8px rgba(0, 0, 90, 0.01)',
                    backgroundColor: '#fff',
                  }}
                >
                  <StyledPbCard className="pb-card" key={i}>
                    {pb.img && <img src={pb.img} alt={`${pb.username} 이미지`} />}
                    <section className="self-introduce">
                      <div id="name">{pb.username}PB</div>
                      <div id="location">
                        <img src="/assets/pb-location.svg" alt="location" />
                        {pb.branchOffice}
                      </div>
                    </section>
                    <section className="sector">
                      <article className="mainfield">
                        <p>주력 분야</p>
                          {pb.mainFields.map((field, i) => (
                            <div id="mainfields" key={i}>{field}</div>
                          ))}
                      </article>

                      <article className="topics">
                        <p>관심 토픽</p>
                        {pb.tags.map((topic, i) => (
                          <div id="interests" key={i}>{topic}</div>
                        ))}
                      </article>

                      <article className="ports">
                        <p>주 포트폴리오 자산군</p>
                        <div id="price">{pb.minConsultingAmount}만원 이상</div>
                      </article>
                    </section>
                    <div id="introduction">{pb.introduction}</div>

                    <section className="reserve">
                      <div
                        id="reserve-btn"
                        onClick={() => handlePbClick(pb)}
                      >
                        
                        <img src="/assets/pb-reserve.svg" alt="reserve" />
                        PB 예약하기
                      </div>

                      {/* 이미지 로딩을 감지하기 위한 별도의 영역 */}
                      <img 
                        src="/assets/caleander-icon.svg" 
                        style={{ width: "80px", display: 'none' }} // 실제로 보이지 않게 설정
                        onLoad={handleImageLoad}
                        alt="Calendar Icon"
                      />

                      <Modal id="custom-modal"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      show={showModal && imageLoaded} onHide={handleNoClick}
                      backdropClassName="custom-backdrop" 
                      >
                        <Modal.Header id="modal-header">
                          <img 
                          src="/assets/caleander-icon.svg" style={{"width":"80px"}}></img>
                          <h5>상담 예약 진행</h5></Modal.Header>
                      <Modal.Body id="modal-body"><b>{clickedPb?.username}PB</b>와 상담 날짜 예약을 진행할게요.</Modal.Body>
                      <Modal.Footer id="modal-footer">
                        <Button className="modal-no" variant="light" onClick={handleNoClick}>
                          No
                        </Button>
                        <Button className="modal-yes" variant="light" onClick={handleYesClick}>
                          Yes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    </section>
                  </StyledPbCard>
                  </motion.div>
                ))              
                )}
            </StyledPbontainer>
          </StyledPbSection>
        </StyledHomeContent>
      </StyledHomeMainContent>
    </StyledHomeContainer>
  );
}