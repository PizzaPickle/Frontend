import styled, { css } from "styled-components";


export const StyledHomeContainer = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
`

export const StyledHomeMainContent = styled.div`
    display: flex;
    flex: 1;
`

export const StyledHomeContent = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto; /* 스크롤 */
`

export const StyledHeadText = styled.div`
    font-size: xx-large;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.navy};
`

export const StyledHomeSection1= styled.div`
    display: flex;
    gap: 20px;
    padding: 10px;
`

export const StyledContentBlock= styled.div`
    display: flex;
    gap: 20px;
    padding: 18px;
    color: ${({ theme }) => theme.colors.navy};
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.background_deep};
`

export const StyledS1Text= styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;

    span {
        font-weight: 700;
    }

    span > p {
        text-align: center;
    }
    
    span > hr {
        border: none;
        height: 6px;
        background-color: #FFE35E; /* 선의 색상 */
        margin-top: -5px; /* 텍스트와 선 사이의 간격 */
        border-radius: 20px;
    }

    section {
        display: flex;
        gap: 10px;
        margin-left: 10px;
        margin-right: 10px;
        font-size: small;
        background-color: #F6F8FF;
        padding: 10px;
        border-radius: 20px;
    }

    section > p:nth-child(-n+2) {
        padding-right: 12px;
        border-right: 1px solid ${({ theme }) => theme.colors.line_gray};
    }
`