import styled, { css } from "styled-components";


export const Container=styled.div`
    background-color: ${({ theme }) => theme.colors.background_deep};
    width: 940px;
    height: 152px;
    border-radius: 16px;
    display: flex;
    gap: 30px;
    padding-left: 24px;
    align-items: center;
    position: relative;
   
`
export const CardContainer = styled.div`
    
    display: flex;
    gap: 30px;
  
    
`
export const PBImg=styled.img`
    width: 111.85px;
    height: 105px;
`
export const PBInfo=styled.div`
    
`
export const InfoHeader=styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`
export const PBName=styled.div`
    font-size: 21px;
    color: #636566;
    font-weight: bold;

`
export const ConsultingStatus=styled.div`
    background-color: #4B4FFF; //props로 색깔 설정하기
    width: 59px;
    height: 22px;
    border-radius:15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size:11px;
`


export const InfoFooter=styled.div`
`
export const Icon=styled.img`
`
export const OfficeName=styled.div`
    font-size: 11px;
    color: #676767;
    font-weight: 600;
`
export const ConsultingTime=styled.div`
    display: flex;
    gap: 5px;

`
export const TimgTag=styled.div`
    background-color: #E3E6F0;
    width: 92px;
    height: 30px;
    border-radius:10px;
    font-size: 11px;
    align-items: center;
    display: flex;
    justify-content: center;
`
export const TimeContent=styled.div`
    font-size:11px;
    border: solid 1.5px #D2D5DE;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 5px;
    padding-left:15px;
    padding-right: 15px;
`
export const Location=styled.div`
    display: flex;
    align-content: center;
    gap: 3px;
    margin-bottom: 15px;
    margin-top:3px;
`
export const ConsultingInfo=styled.div`
    position: absolute;
    right: 0;
    padding-right: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
`

export const AlarmIcon=styled.img`
`
export const ConsultingButton=styled.button`
    background-color: #C6CAD1;
    width: 165px;
    height: 59px;
    border-radius: 10px;
    border:none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: white;
    font-weight: 500;

`
export const Content=styled.div`
    font-size: 16px;
    color: #636566;
    
`
