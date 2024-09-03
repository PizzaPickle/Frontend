import React, { useState, useEffect } from "react";
import Header from "../../components/common/header/Header";
import { StyledHomeContainer, StyledHomeMainContent, StyledHomeContent } from "../Homepage/HomePage.style";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { StyledHeadText } from "../Homepage/HomePage.style";
import { StyledPbSection, StyledPbCard, StyledPbontainer, StyledReserveContainer, StyledPbSelectContainer } from "./pblist.style";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setSelectedPb, setSelectedDate } from "../../store/reducers/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Pblist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [pbData, setPbData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPb, setSelectedPbState] = useState(null); 
  const [showCardOnly, setShowCardOnly] = useState(false);
  const { token } = useSelector((state) => state.user); 
  const [selectedDate, setSelectedDateState] = useState(null);
  const [showReqWrite, setShowReqWrite] = useState(false);

  const [selectedMainField, setSelectedMainField] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const filteredData = pbData.filter((pb) => {
    const mainFieldMatch =
      selectedMainField === "" || pb.mainFields.includes(selectedMainField);
    const tagMatch = selectedTag === "" || pb.tags.includes(selectedTag);
    return mainFieldMatch && tagMatch;
  });

  useEffect(() => {
    console.log('Selected Date (useEffect):', selectedDate);
    console.log('Selected PB (useEffect):', selectedPb);
  }, [selectedDate, selectedPb]);

  const formatDate = (date) => {
    if (!date) return "";

    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      weekday: "long",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/pickle-pb/api/pblist", {
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
        console.log(result.data);
        setPbData(result.data);
      } catch (error) {
        console.log("데이터 요청 실패:", error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, [token]);

  const handleCardClick = (pb) => {
    setSelectedPbState(pb);
    setShowCardOnly(true);
    console.log("PB선택 리덕스 저장")
    dispatch(setSelectedPb(pb));

  };

  const handleReqWrite = () => {
    if (selectedDate !== null && selectedPb !== null) {
      console.log("Date선택 리덕스 저장")
      dispatch(setSelectedDate(selectedDate));
    }
    else {
    alert("날짜와 시간을 선택해주세요.")
  }
  };

  const handleMainFieldChange = (e) => {
    setSelectedMainField(e.target.value);
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  return (
    <StyledHomeContainer>
      <Header />
      <StyledHomeMainContent>
        <Sidebar />
        <StyledHomeContent>
          <StyledPbSection>
            {!showCardOnly && (
              <div>
                <StyledHeadText>나에게 맞는 PB를 만나보세요.</StyledHeadText>
                {/* 필터링 옵션 */}
                <label>
                  주력 분야:
                  <select value={selectedMainField} onChange={handleMainFieldChange}>
                    <option value="">전체</option>
                    <option value="국내주식">국내주식</option>
                    <option value="해외주식">해외주식</option>
                    <option value="채권">채권</option>
                  </select>
                </label>

                <label>
                  관심 토픽:
                  <select value={selectedTag} onChange={handleTagChange}>
                    <option value="">전체</option>
                    <option value="연금">연금</option>
                    <option value="노후자금">노후자금</option>
                    <option value="ETF">ETF</option>
                  </select>
                </label>
              </div>
            )}

            {error && <p>에러: {error}</p>}

            <StyledPbontainer className="PbContainer">
              {showCardOnly && selectedPb ? (
                <StyledPbSelectContainer>
                  <StyledHeadText>
                    {selectedPb.username}PB와의 상담을 예약할게요.
                  </StyledHeadText>
                  <section>
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
                      <section className="interest">
                        <article>
                          주력 분야
                          <div className="mainfields">
                            {selectedPb.mainFields.map((field, i) => (
                              <div key={i}>{field}</div>
                            ))}
                          </div>
                        </article>

                        <article className="topics">
                          관심 토픽
                          {selectedPb.tags.map((topic, i) => (
                            <div key={i}>{topic}</div>
                          ))}
                        </article>

                        <article className="ports">
                          <div>주 포트폴리오 자산군</div>
                          <div>{selectedPb.minConsultingAmount}만원 이상</div>
                        </article>
                      </section>
                    </StyledPbCard>
                    <StyledReserveContainer>
                      <div className="DatePick">
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDateState(date)}
                          showTimeSelect
                          dateFormat="Pp"
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          placeholderText="날짜와 시간을 선택해주세요."
                        />
                      </div>
                      {selectedDate && (
                        <div>
                          <span>예약 날짜</span>
                          <p>{formatDate(selectedDate)}</p>
                        </div>
                      )}
                      <Button onClick={handleReqWrite}>다음으로</Button>
                    </StyledReserveContainer>
                  </section>
                </StyledPbSelectContainer>
              ) : (
                filteredData.length > 0 &&
                !showCardOnly &&
                filteredData.map((pb, i) => (
                  <StyledPbCard key={i}>
                    {pb.img && <img src={pb.img} alt={`${pb.username} 이미지`} />}
                    <section className="self-introduce">
                      <div id="name">{pb.username}PB</div>
                      <div id="location">
                        <img src="/assets/pb-location.svg" alt="location" />
                        {pb.branchOffice}
                      </div>
                      <div id="introduction">{pb.introduction}</div>
                    </section>
                    <section className="interest">
                      <article>
                        주력 분야
                        <div className="mainfields">
                          {pb.mainFields.map((field, i) => (
                            <div key={i}>{field}</div>
                          ))}
                        </div>
                      </article>

                      <article className="topics">
                        관심 토픽
                        {pb.tags.map((topic, i) => (
                          <div key={i}>{topic}</div>
                        ))}
                      </article>

                      <article className="ports">
                        <div>주 포트폴리오 자산군</div>
                        <div>{pb.minConsultingAmount}만원 이상</div>
                      </article>
                    </section>
                    <section className="reserve">
                      <Button className="reserve-btn"
                       onClick={() => handleCardClick(pb)}>
                        <img src="/assets/pb-reserve.svg" alt="reserve" />
                        PB 예약하기
                      </Button>
                    </section>
                  </StyledPbCard>
                ))
              )}
            </StyledPbontainer>
          </StyledPbSection>
        </StyledHomeContent>
      </StyledHomeMainContent>
    </StyledHomeContainer>
  );
}