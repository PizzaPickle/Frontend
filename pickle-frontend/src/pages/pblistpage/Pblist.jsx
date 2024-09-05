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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPb } from "../../store/reducers/pbselect";
import { setDate } from "../../store/reducers/dateselect";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Pblist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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
        setPbData(result.data);
      } catch (error) {
        console.log("데이터 요청 실패:", error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <StyledHomeContainer>
      <Header />
      <StyledHomeMainContent>
        <Sidebar />
        <StyledHomeContent>
          <StyledPbSection>
            {!showSelectedPb && (
              <div>
                <StyledHeadText>나에게 맞는 PB를 만나보세요.</StyledHeadText>

                {/* 필터링 옵션 */}
                <div className="filtering">
                  <section>
                    <label>주력 분야:</label>
                    <DropdownButton
                      id="dropdown-main-field"
                      title="주력 분야"
                      onSelect={handleMainFieldChange}
                    >
                      <Dropdown.Item eventKey="국내주식">국내주식</Dropdown.Item>
                      <Dropdown.Item eventKey="해외주식">해외주식</Dropdown.Item>
                      <Dropdown.Item eventKey="채권">채권</Dropdown.Item>
                    </DropdownButton>
                  </section>

                  <section>
                    <label>관심 토픽:</label>
                    <DropdownButton
                      id="dropdown-tag"
                      title="관심 토픽"
                      onSelect={handleTagChange}
                    >
                      <Dropdown.Item eventKey="연금">연금</Dropdown.Item>
                      <Dropdown.Item eventKey="노후자금">노후자금</Dropdown.Item>
                      <Dropdown.Item eventKey="ETF">ETF</Dropdown.Item>
                      <Dropdown.Item eventKey="중개형 ISA">중개형 ISA</Dropdown.Item>
                      <Dropdown.Item eventKey="결혼자금 설계">결혼자금 설계</Dropdown.Item>
                    </DropdownButton>
                    <div>
                      {selectedMainFields.map((field, index) => (
                        <div key={index}>
                          {field} <Button variant="link" onClick={() => handleMainFieldChange(field)}>x</Button>
                        </div>
                      ))}
                    </div>
                    <div>
                      {selectedTags.map((tag, index) => (
                        <div key={index}>
                          {tag} <Button variant="link" onClick={() => handleTagChange(tag)}>x</Button>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {error && <p>에러: {error}</p>}

            <StyledPbontainer className="PbContainer">
              {filteredData.length > 0 && !showSelectedPb && (
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
                      <Button
                        className="reserve-btn"
                        onClick={() => handlePbClick(pb)}
                      >
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
