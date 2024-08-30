import React from "react"
import Header from "../../components/common/header/Header"
import Sidebar from "../../components/common/sidebar/Sidebar"
import { StyledHead2Text, StyledHomeContainer, StyledHomeContent, StyledHomeMainContent } from "../Homepage/HomePage.style"
import { useSelector } from "react-redux"

export default function Mydata(){  
    //Login User 정보
    const userId = useSelector((state) => state.user.id);
    const userName = useSelector((state) => state.user.name);

    return (
        <>
        <StyledHomeContainer>
            <Header/>
            <StyledHomeMainContent>                
                <Sidebar/>
                <StyledHomeContent>

                    <StyledHead2Text>
                        
                    </StyledHead2Text>
                </StyledHomeContent>
                
            </StyledHomeMainContent>
        </StyledHomeContainer>
        </>
)
}