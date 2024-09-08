import React, { useState, useEffect } from "react";
import "./ProgressPage.css"; // 페이지에 대한 스타일을 따로 관리

export default function ProgressPage() {
  const [progress, setProgress] = useState(0); // 진행 상황을 나타내는 state
  const [isComplete, setIsComplete] = useState(false); // 로딩 완료 여부

  useEffect(() => {
    if (progress < 100) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 10);
      }, 500); // 500ms마다 10%씩 증가
      return () => clearInterval(timer);
    } else {
      setIsComplete(true); // 100%가 되면 로딩 완료 상태로 전환
    }
  }, [progress]);

  return (
    <div className="progress-page">
      {!isComplete ? (
        <div className="loading-container">
          <header className="logo">
            <p>피클 로고</p>
          </header>
          <p>금융기관 및 기관의 상세정보를 연결하고 있습니다...</p>
          <div className="progress-box">
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
            src="/assets/Cones.png" // 실제 이미지 경로로 수정
            alt="Completion Logo"
            className="completion-logo"
          />
          <h1>연결 완료!</h1>
          <p>피클 서비스로 이동할게요.</p>
        </div>
      )}
    </div>
  );
}
