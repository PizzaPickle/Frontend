import React, { useState } from "react";
import { StyledHomeContainer, StyledHomeMainContent, StyledHomeContent, StyledHead2Text, StyledHeadText } from "../Homepage/HomePage.style";
import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";

export default function RequestMydata() {
    

    return (
        <StyledHomeContainer>
        <Header />
        <StyledHomeMainContent>
            <Sidebar />
        <StyledHomeContent>
        <StyledHead2Text>
            dfd
        </StyledHead2Text>
        <StyledHeadText>
            dfd
        </StyledHeadText>
        </StyledHomeContent>
        </StyledHomeMainContent>
        </StyledHomeContainer>
    )

}