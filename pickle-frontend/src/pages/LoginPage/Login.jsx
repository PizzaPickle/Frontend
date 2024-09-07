import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { customerToken, pbToken } from "../../api/customerApi";

export default function Login() {
  const [loginType, setLoginType] = useState("customer");
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleJoinPageRedirect = () => {
    navigate("/joinpage"); // 'joinpage'로 이동
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
    console.log("123");
    console.log(loginType);
    if (loginType === "customer") {
      try {
        const response = await customerToken(formData);
        // 회원가입 성공 후 로직 추가
        console.log(response);
      } catch (error) {
        console.error("회원가입 실패:", error);
      }
    } else if (loginType === "pb") {
      try {
        // PB 회원가입 로직이 따로 있다면 여기에 추가
        const response = await pbToken(formData);
        console.log(response);

        // 성공 시 모달 창 표시
      } catch (error) {
        console.error("회원가입 실패:", error);
      }
    }
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
    </div>
  );
}
