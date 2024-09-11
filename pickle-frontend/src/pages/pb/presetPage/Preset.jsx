import React from "react";
import Header from "../../../components/common/header/Header";
import Sidebar from "../../../components/common/sidebar/Sidebar";
import { StyledHomeContainer, StyledHomeMainContent, StyledHomeContent, StyledHead2Text, StyledContentBlock } from "../../homePage/HomePage.style";
import PbSidebar from "../../../components/common/pbsidebar/PbSidebar";

export default function Preset() {
    

    return (
        <StyledHomeContainer>
            <Header/>
            <StyledHomeMainContent>                
                <PbSidebar/>
        <StyledHomeContent style={{padding: "40px"}}>
            <StyledHead2Text>
                내가 만든 프리셋
            </StyledHead2Text>
            <StyledContentBlock>
                dds
            </StyledContentBlock>
        </StyledHomeContent>
        </StyledHomeMainContent>
        </StyledHomeContainer>
    )
}
