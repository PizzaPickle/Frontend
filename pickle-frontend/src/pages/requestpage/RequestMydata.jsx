import React, { useState } from "react";
import { StyledHomeContainer, StyledHomeMainContent, StyledHomeContent, StyledHead2Text, StyledHeadText } from "../Homepage/HomePage.style";
import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import html2canvas from "html2canvas";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setmydataURL } from "../../store/reducers/mydataurl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function RequestMydata() {

  const mydataURL = useSelector((state) => state.mydataURL.mydataURL);
  const dispatch = useDispatch();

    //마이데이터 스크린샷 버튼
    const onClickMydataButton = () => {
        const target = document.getElementById("mydata-screenshot");
        if (!target) {
          return alert("요청서에 보내실 마이데이터를 선택해주세요.");
        }
        html2canvas(target).then((canvas) => {
          // 캡처된 이미지를 Data URL 형식으로 변환하여 상태에 저장
          const url = canvas.toDataURL("request-mydata/png");
          dispatch(setmydataURL(url));
        }).catch((error)=>{
            alert("저장 중 오류가 발생하였습니다.")
        });
      };

    useEffect(()=>{
        console.log("마이데이터 url 저장: ",mydataURL)
    },[mydataURL])

    return (
        <StyledHomeContainer>
        <Header />
        <StyledHomeMainContent>
            <Sidebar />
        <StyledHomeContent>
        <StyledHeadText>
            dfd
        </StyledHeadText>
        <Button onClick={onClickMydataButton}>dd</Button>
        <div id="mydata-screenshot">dddd</div>

        <div>{mydataURL}</div>
        </StyledHomeContent>
        </StyledHomeMainContent>
        </StyledHomeContainer>
    )

}