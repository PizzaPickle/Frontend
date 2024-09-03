import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // 페이지 전환을 위한 훅
import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { StyledHomeContainer, StyledHomeMainContent, StyledHeadText, StyledHomeContent } from "../Homepage/HomePage.style";

export default function Request() {
    const selectedPb = useSelector((state) => state.selectedPb);
    console.log(selectedPb)

  return (
    <StyledHomeContainer>
      <Header />
      <StyledHomeMainContent>
        <Sidebar />
        <StyledHomeContent>
            <StyledHeadText>
             
            </StyledHeadText>
            <section>

            </section>
        </StyledHomeContent>
      </StyledHomeMainContent>
    </StyledHomeContainer>
  );
}
