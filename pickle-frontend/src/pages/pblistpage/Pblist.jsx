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

export default function Pblist() {
  const [pbData, setPbData] = useState([]); // API 응답 데이터를 저장할 상태 변수
  const [error, setError] = useState(null); // 에러를 저장할 상태 변수
  const [selectedPb, setSelectedPb] = useState(null); // 선택된 PB를 저장할 상태 변수
  const [showCardOnly, setShowCardOnly] = useState(false); // 카드만 보이게 할지 여부를 결정하는 상태 변수
  const { token } = useSelector(state => state.user); // Redux 상태에서 token 가져오기
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedMainField, setSelectedMainField] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // 필터링 기능
  // TODO 현재는 주력분야, 관심토픽만 가능 + 하나의 필터에서 복수선택 불가능
  const filteredData = pbData.filter((pb) => {
    const mainFieldMatch =
      selectedMainField === "" || pb.mainFields.includes(selectedMainField);
    const tagMatch = selectedTag === "" || pb.tags.includes(selectedTag);
    return mainFieldMatch && tagMatch;
  });

  // DateTime형식 변환
  const formatDate = (date) => {
    if (!date) return '';

    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'long',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/pickle-pb/api/pblist', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
          }
        });

        if (!response.ok) {
          const errorText = await response.text(); 
          console.log(`네트워크 응답이 올바르지 않습니다: ${errorText}`);
          setError('서버 응답 오류');
          return;
        }

        const result = await response.json();
        console.log(result.data)
        setPbData(result.data); 
      } catch (error) {
        console.log("데이터 요청 실패:", error.message);
        setError(error.message); // 에러 상태 업데이트
      }
    };

    fetchData();
  }, [token]); //토큰 변경시 재요청

  const handleCardClick = (pb) => {
    setSelectedPb(pb);
    setShowCardOnly(true); // 버튼 클릭 시 카드만 보이게 설정
  };

  const handleMainFieldChange = (e) => {
    setSelectedMainField(e.target.value);
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  return (
    <>
      <StyledHomeContainer>
        <Header />
        <StyledHomeMainContent>
          <Sidebar />
          <StyledHomeContent>
            <StyledPbSection>

              {!showCardOnly && (
                <div>
                  
              <StyledHeadText>
                나에게 맞는 PB를 만나보세요.
              </StyledHeadText>
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

              {/* {error && <p>에러: {error}</p>} */}
              
              <StyledPbontainer className="PbContainer">
                {showCardOnly && selectedPb ? (
                  <StyledPbSelectContainer>
                    <StyledHeadText>
                    {selectedPb.username}PB와의 상담을 예약할게요.
                  </StyledHeadText>
                  <section>
                  <StyledPbCard>
                    {selectedPb.img && <img src={selectedPb.img} alt={`${selectedPb.username} 이미지`} />}
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
                          selected={selectedDate}                // 선택된 날짜와 시간 상태
                          onChange={(date) => setSelectedDate(date)} // 날짜와 시간이 변경될 때 상태 업데이트
                          showTimeSelect                         // 시간 선택 기능 활성화
                          dateFormat="Pp"                        // 날짜와 시간 형식
                          timeFormat="HH:mm"                     // 시간 형식
                          timeIntervals={30}                     // 시간 선택 간격 (15분 간격)
                          placeholderText="날짜와 시간을 선택해주세요." // 기본 안내 문구
                        />
                      </div>
                      {selectedDate && (
                        <div>
                          <span>예약 날짜</span>
                          <p>{formatDate(selectedDate)}</p>
                        </div>
                      )}
                    <Button>다음으로</Button>

                    </StyledReserveContainer>
                  </section>
                    
                </StyledPbSelectContainer>

                ) : (
                  filteredData.length > 0 && !showCardOnly && filteredData.map((pb, i) => (
                    <div>
                    <StyledPbCard key={i} onClick={() => handleCardClick(pb)}>
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
                        <Button className="reserve-btn">
                          <img src="/assets/pb-reserve.svg" alt="reserve" />
                          PB 예약하기
                        </Button>
                      </section>
                    </StyledPbCard>
                    </div>
                  ))
                )}
              </StyledPbontainer>
            </StyledPbSection>
          </StyledHomeContent>
        </StyledHomeMainContent>
      </StyledHomeContainer>
    </>
  );
}