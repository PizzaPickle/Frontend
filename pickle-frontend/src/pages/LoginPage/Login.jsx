import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { customerToken } from "../../api/customerApi";
import { pbToken } from "../../api/PBApi";

export default function Login() {
  const [loginType, setLoginType] = useState("customer");
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [toastMessage, setToastMessage] = useState(""); // 토스트 메시지 state 추가
  const [showToast, setShowToast] = useState(false); // 토스트 표시 여부

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const handleJoinPageRedirect = () => {
    navigate("/joinpage"); // 'joinpage'로 이동
  };

  const handleHomePageRedirect = () => {
    navigate("/homepage");
  };

  // 회원가입 타입에 따라 formData 초기화
  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    if (type === "customer") {
      setFormData({
        userId: "",
        password: "",
      });
    } else if (type === "pb") {
      setFormData({
        pbNumber: "",
        password: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    if (loginType === "customer") {
      try {
        const response = await customerToken(formData);
        if (response.success) {
          // 성공 시 모달 창 표시
          showModalWindow("로그인 성공", "로그인이 성공적으로 완료되었습니다.");
        } else {
          // 실패 시 토스트 알림 표시
          showToastMessage(
            "로그인이 실패했습니다. 아이디 비밀번호를 확인해주세요."
          );
        }
      } catch (error) {
        // 실패 시 토스트 알림 표시
        showToastMessage("로그인이 실패했습니다. 다시 시도해주세요.");
      }
    } else if (loginType === "pb") {
      try {
        const response = await pbToken(formData);
        if (response.success) {
          // 성공 시 모달 창 표시
          showModalWindow("로그인 성공", "로그인이 성공적으로 완료되었습니다.");
        } else {
          // 실패 시 토스트 알림 표시
          showToastMessage(
            "로그인이 실패했습니다. 사번과 비밀번호를 확인해주세요."
          );
        }
      } catch (error) {
        // 실패 시 토스트 알림 표시
        showToastMessage("로그인이 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 모달 창을 띄우는 함수
  const showModalWindow = (title, message) => {
    setModalContent({ title, message });
    setShowModal(true);
  };

  // 토스트 알림 띄우는 함수
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false); // 3초 후에 토스트 자동으로 숨기기
    }, 3000);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">피클 로고</h1>
      <div className="login-toggle">
        <button
          className={`toggle-btn ${loginType === "customer" ? "active" : ""}`}
          onClick={() => handleLoginTypeChange("customer")}
        >
          고객으로 로그인
        </button>
        <button
          className={`toggle-btn ${loginType === "pb" ? "active" : ""}`}
          onClick={() => handleLoginTypeChange("pb")}
        >
          PB로 로그인
        </button>
      </div>
      <div className="login-form">
        {loginType === "customer" ? (
          <>
            <input
              type="text"
              placeholder="아이디"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              className="login-input"
            />
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="login-input"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="사번"
              name="pbNumber"
              value={formData.pbNumber}
              onChange={handleInputChange}
              className="login-input"
            />
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="login-input"
            />
          </>
        )}
        <button className="login-btn" onClick={handleLogin}>
          로그인
        </button>
      </div>
      <p className="signup-link" onClick={handleJoinPageRedirect}>
        아직 피클 회원이 아니신가요?
      </p>

      {/* 로그인 성공 시 모달 */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalContent.title}</h2>
            <p>{modalContent.message}</p>
            {modalContent.title === "로그인 성공" &&
              (loginType === "customer" ? (
                <button onClick={handleHomePageRedirect}>
                  피클 홈화면으로 가기
                </button>
              ) : (
                <button onClick={handleJoinPageRedirect}>
                  요청서 페이지로 이동
                </button>
              ))}
          </div>
        </div>
      )}

      {/* 로그인 실패 시 작은 알림 (토스트) */}
      {showToast && (
        <div className={`toast ${showToast ? "show" : ""}`}>{toastMessage}</div>
      )}
    </div>
  );
}
