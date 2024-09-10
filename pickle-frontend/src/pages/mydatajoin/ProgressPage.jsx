import React, { useState, useEffect } from "react";
import "./ProgressPage.css"; // 페이지에 대한 스타일을 따로 관리
import { useNavigate } from "react-router-dom";

export default function ProgressPage() {
  const [progress, setProgress] = useState(0); // 진행 상황을 나타내는 state
  const [isComplete, setIsComplete] = useState(false); // 로딩 완료 여부
  const navigate = useNavigate();

  useEffect(() => {
    if (progress < 100) {
      const timer = setInterval(() => {
        const increment = Math.random() < 0.5 ? 3 : 5;
        setProgress((prevProgress) => Math.min(prevProgress + increment, 100));
      }, 200);
      return () => clearInterval(timer);
    } else {
      setIsComplete(true);
    }
  }, [progress]);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        goToLoginPage(); // 4초 후 로그인 페이지로 이동
      }, 4000); // 4초(4000ms) 후에 실행
      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
    }
  }, [isComplete]);

  const goToLoginPage = () => {
    navigate("/loginpage");
  };

  return (
    <div className="progress-page">
      {!isComplete ? (
        <div className="loading-container">
          <header className="logo">
            <p
              className="tag"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              피클 로고
            </p>
          </header>
          <p>금융기관 및 기관의 상세정보를 연결하고 있습니다...</p>
          <div
            className="progress-box"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "150px",
              height: "200px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              margin: "0 auto" /* 수평 중앙 정렬 */,
            }}
          >
            <div className="spinner" />
            <p>{progress}%</p>
          </div>
        </div>
      ) : (
        <div className="complete-container">
          <header className="logo">
            <p>피클 로고</p>
          </header>
          <img
            src="/assets/Cones.png"
            alt="Completion Logo"
            className="completion-logo"
          />
          <h1>연결 완료!</h1>
          <p>로그인 페이지로 이동할게요.</p>
        </div>
      )}
    </div>
  );
}
