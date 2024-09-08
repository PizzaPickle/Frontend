import styled, { css } from "styled-components";

export const StyledMydataReqContainer = styled.div`
    width: 80%;
`

export const StyledMydataContainer = styled.div`
    position: relative;
    max-height: calc(100vh - 60px); /* 버튼과 체크박스 높이 고려 */
    overflow-y: auto; /* 세로 방향으로 스크롤 추가 */
    width: 910px;
    margin-top:20px;
    background-color: #F5F8FF;
    border-radius: 20px;
`

export const StyledCheckboxDiv = styled.div`
  width: fit-content;
  position: fixed;
  z-index: 1000;
  background: linear-gradient(to bottom, rgb(240,243,253,1), rgb(241,244,255,0.94), rgb(243,246,255,0.1));
  /* backdrop-filter: blur(10px); */
  display: flex;
  justify-content: space-between;
  padding: 30px 30px 100px 30px;
  border-radius: 20px;
  width: 900px;
  Form {
    display: flex;
    flex-direction: column;
    gap: 5px;

    div {
      display: flex;
      gap: 5px;
    }
  }
`
