import React from "react";
import "./Mydatajoin.css";
import { useNavigate } from "react-router-dom";

export default function Mydatajoin() {
  const navigate = useNavigate();

  const goToMyDataTerms = () => {
    navigate("/mydataterms");
  };

  return (
    <div className="container">
      <header className="logo">
        <p>피클 로고</p>
      </header>

      <main>
        <h1 className="title">피클(PICKLE)은</h1>
        <p className="description">
          금융 마이데이터를 바탕으로 <br />
          믿을 수 있는 PB와 맞춤형 자산 관리 서비스를 <br />
          제공하는 플랫폼이에요.
        </p>

        <p className="sub-description">
          마이데이터에 동의하고, <br />
          나만의 자산 포트폴리오를 운영해보세요.
        </p>

        <div className="buttons">
          <button onClick={goToMyDataTerms} className="start-button">
            마이데이터 가입하러 가기
          </button>
          <button className="later-button">나중에 시작하기</button>
        </div>
      </main>

      <div className="image-container">
        {/* You can use an <img> tag to insert the money hands icon */}
        <img
          src="/assets/FINANCE.png"
          alt="Money hands icon"
          className="icon"
        />
      </div>
    </div>
  );
}
