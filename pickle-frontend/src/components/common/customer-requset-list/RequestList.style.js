import styled, { css } from "styled-components";
export const Container=styled.div`
    width: 956px;
    height: 120px;
    background-color: ${({ theme }) => theme.colors.background_deep};
    display: flex;
    position: relative;
    padding: 30px 10px 30px 10px;
    border-radius: 20px;
    align-items: center;

    
`
export const CardContainer=styled.div`
   display: flex;
   gap: 20px;
`
export const PBImg=styled.img`
    width: 78px;
    height: 78px;

`
export const PBInfo=styled.div`
    display: grid;
    gap: 10px;
   
`
export const InfoHeader=styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
export const PBName=styled.div`
    font-size: 21px;
    font-weight: bold;
    color: #636566;

`
export const InfoFooter=styled.div`
    display: flex;
    gap: 15px;

`
export const OfficeName=styled.div`
    font-size: 11px;
    color: #636566;


`
export const ConsultingTime=styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    
`
export const TimgTag=styled.div`
    background-color: #E3E6F0;
    width: 92px;
    height: 30px;
    border-radius: 10px;
    font-size: 11px;
    color: #636566;
    display: flex;
    align-items: center;
    justify-content: center;


`
export const TimeContent=styled.div`
    color: #636566;
    font-size: 11px;
`
export const ConsultingInfo=styled.div`
    position: absolute;
    right: 0;
    display: flex;
    gap: 10px;
    margin-right: 20px;
`

export const RequestCheck=styled.button`
    background-color: #9FA1A6;
    color: white;
    font-size: 14px;
    border-radius: 10px;
    width: 100px;
    height: 69px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
`
export const ReRequest=styled.button`
    background-color: #0046FF;
    color: white;
    font-size: 14px;
    border-radius: 10px;
    width: 100px;
    height: 69px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
`
export const ConsultingStatus=styled.div`
    width: 70px;
    height: 28px;
    background-color:  ${({ theme }) => theme.colors.purple};
    border-radius: 20px;
    color: white;
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 300;
    margin-left: 10px;


`