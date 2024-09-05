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
  // TODO 
  // 버튼 눌러서 서버에 넘기고 받은 URL을 redux로 보관하기


  const mydataURL = useSelector((state) => state.mydataURL.mydataURL);
  // const dispatch = useDispatch();


  function dataURLtoBlob(dataURL) {
    // dataURL의 앞부분을 분리 (ex: "data:image/png;base64,")
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]); // base64 디코딩
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}

    //마이데이터 스크린샷 버튼
    const onClickMydataButton = () => {
        const target = document.getElementById("mydata-screenshot");
        if (!target) {
          return alert("요청서에 보내실 마이데이터를 선택해주세요.");
        }
        html2canvas(target).then((canvas) => {
          // 캡처된 이미지를 Data URL 형식으로 변환하여 상태에 저장
          const url = canvas.toDataURL("request-mydata/png");
          // dispatch(setmydataURL(url));
          getImageBlob();
        }).catch((error)=>{
          console.log(error)
            alert("저장 중 오류가 발생하였습니다.")
        });
        }

      //url->Blob->FormData변환
      const getImageBlob = async () => {

        const target = document.getElementById("mydata-screenshot");
        if (!target) {
            return alert("요청서에 보내실 마이데이터를 선택해주세요.");
        }

        try {
            const canvas = await html2canvas(target);

            return new Promise((resolve, reject) => {
                canvas.toBlob((blob) => {
                    if (!blob) {
                        return reject("Blob 생성 실패");
                    }

                    const formData = new FormData();
                    formData.append('file', blob, 'screenshot.png'); 
                    
                    for (let [key, value] of formData.entries()) {
                      if (value instanceof File) {
                        // 속성 확인
                          console.log(`${key}: ${value.name}, ${value.size} bytes, ${value.type}`);
                      } else {
                          console.log(`${key}: ${value}`);
                      }
                  }
                    resolve(formData);

                    
                }, "image/png");
            });
        } catch (error) {
            console.log(error);
            alert("이미지 변환 중 오류가 발생했습니다.");
        }
      };

    return (
        <StyledHomeContainer>
        <Header />
        <StyledHomeMainContent>
            <Sidebar />
        <StyledHomeContent>
        <StyledHeadText>
            마이데이터 전송 화면입니다.
        </StyledHeadText>
        <Button onClick={onClickMydataButton}>마이데이터를 요청서에 저장하기</Button>
        <div id="mydata-screenshot" style={{ width: '200px', height: '200px', backgroundColor: 'lightgray' }}>
                My Data Screenshot Area
            </div>
        <div>
        </div>
        </StyledHomeContent>
        </StyledHomeMainContent>
        </StyledHomeContainer>
    )

}