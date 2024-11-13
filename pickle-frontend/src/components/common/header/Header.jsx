import { StyledHeaderContent, StyledHeaderDiv } from "./Header.style";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/reducers/user"; // 액션 import

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoginButton = () => {
    navigate("/loginpage"); // 'joinpage'로 이동
  };

  // 로컬 스토리지에서 토큰 확인
  const token = localStorage.getItem("accessToken");

  // 로그아웃 버튼 핸들러
  const handleLogoutButton = () => {
    dispatch(logoutUser());
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
                border: "1px solid #D8DDEE",
                color: "black",
              }}
              onClick={handleLogoutButton}
            >
              로그아웃
            </Button>
          ) : (
            <Button
              id="login-button-home"
              style={{
                fontSize: "small",
                backgroundColor: "transparent",
                border: "1px solid #D8DDEE",
                color: "black",
              }}
              onClick={handleLoginButton}
            >
              로그인
            </Button>
          )}

          <div className="alarm_icon">
            <img src="/assets/alarm.svg"></img>
            <img src="/assets/sun.svg"></img>
          </div>
        </section>
      </StyledHeaderContent>
    </StyledHeaderDiv>
  );
}
