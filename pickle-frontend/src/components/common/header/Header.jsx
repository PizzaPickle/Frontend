import React from "react";
import { StyledHeaderContent, StyledHeaderDiv } from "./Header.style";

export default function Header() {
    return (
    <StyledHeaderDiv>
        <StyledHeaderContent>
            <div className="alarm_icon">                
            <img src="/assets/alarm.svg"></img>
            </div>
            <div className="sun_icon">                
            <img src="/assets/sun.svg"></img>
            </div>
        </StyledHeaderContent>
    </StyledHeaderDiv>
    )
};

