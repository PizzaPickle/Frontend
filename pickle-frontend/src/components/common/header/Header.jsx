import React from "react";
import { StyledHeaderContent, StyledHeaderDiv } from "./Header.style";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const handleLoginButton = () => {
        navigate("/loginpage"); // 'joinpage'로 이동
    };

    // 로컬 스토리지에서 토큰 확인
    const token = localStorage.getItem("accessToken");

     // 로그아웃 버튼 핸들러
     const handleLogoutButton = () => {
        localStorage.removeItem("accessToken"); // 토큰 제거
        navigate("/loginpage"); // 로그아웃 후 로그인 페이지로 이동
    };

    return (
    <StyledHeaderDiv>
        <StyledHeaderContent>
            <section>
            {token ? (
                <Button
                id="login-button-home"
                style={{
                    fontSize: "small",
                    backgroundColor: "transparent",
                    border:"1px solid #D8DDEE",
                    color: "black"
                }}
                onClick={handleLogoutButton}>
                    로그아웃
                </Button>):
            <Button
            id="login-button-home"
            style={{
                fontSize: "small",
                backgroundColor: "transparent",
                border:"1px solid #D8DDEE",
                color: "black"
            }}
            onClick={handleLoginButton}>
                로그인
            </Button>}

            <div className="alarm_icon">                
            <img src="/assets/alarm.svg"></img>
            <img src="/assets/sun.svg"></img>
            </div>
            </section>
        </StyledHeaderContent>
    </StyledHeaderDiv>
    )
};