import React from "react";
import { StyledHeaderContent, StyledHeaderDiv } from "./Header.style";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const handleLoginButton = () => {
        navigate("/loginpage"); // 'joinpage'로 이동
    };

    return (
    <StyledHeaderDiv>
        <StyledHeaderContent>
            <section>
            <div className="alarm_icon">                
            <img src="/assets/alarm.svg"></img>
            <img src="/assets/sun.svg"></img>
            </div>
            <Button
            id="login-button-home"
            style={{
                fontSize: "small",
                backgroundColor: "transparent",
                border:"none",
                color: "black"
            }}
            onClick={handleLoginButton}>
                로그인
            </Button>
            </section>
        </StyledHeaderContent>
    </StyledHeaderDiv>
    )
};

