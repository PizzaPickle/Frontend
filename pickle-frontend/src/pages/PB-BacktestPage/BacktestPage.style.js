import styled, { css, keyframes } from "styled-components";


export const StyledConsultContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.navy};
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
`

export const StyledConsultBox = styled.div`
    width: 1300px;
    height: 765px;
    border-radius: 20px;
    display: flex;
`

export const StyledConsultSide = styled.div`
    background-color: rgba(255,255,255,0.71);
    flex: 1;
    border-radius: 20px 0px 0px 20px;
    z-index: 1000;
`

export const StyledLeftContent = styled.div`
    flex:4;
    border-right: solid 1px lightgrey;
    background-color: white;
`

export const StyledConsultContentBox = styled.div`
    background-color: white;
    border-radius: 0px 20px 20px 0px;
    flex: 5;
`