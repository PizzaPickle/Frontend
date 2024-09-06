import styled, { css, keyframes } from "styled-components";
// 애니메이션 정의
const scaleUp = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
`;

const scaleDown = keyframes`
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;
export const StyledHomeContainer = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    overflow-y: hidden;
    
`

export const StyledHomeMainContent = styled.div`
    display: flex;
`

export const StyledHomeContent = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 20px;
    overflow-y: auto;
`

export const StyledHeadText = styled.div`
    padding-top: 15px;
    font-size: xx-large;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.navy};
`

export const StyledHomeSection= styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
    margin-bottom: 40px;

    article {
        display: flex;
        gap: 20px;
    }
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

    span > div {
        text-align: center;
        margin-bottom: 0px;
    }
    
    span > hr {
        border: none;
        height: 6px;
        background-color: #FFE35E; 
        margin-top: -5px; 
        border-radius: 20px;
        margin-bottom: 0;
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

    section > div:nth-child(-n+2) {
        padding-right: 12px;
        border-right: 1px solid ${({ theme }) => theme.colors.line_gray};
    }
`

export const StyledHead2Text= styled.div`
    font-size: x-large;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.navy};
`

export const StyledPbCard = styled.div`
    width: 180px;
    height: 180px;
    background-color: ${({ theme }) => theme.colors.cobartblue};
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        animation: ${scaleDown} 0.3s ease-in-out forwards;
    }

    &:hover {
        img {
            animation: ${scaleUp} 0.3s ease-in-out forwards;
        }
    }

    div {
        position: absolute;
        z-index: 100;
        color: white;
        font-size: larger;
        font-weight: 600;
        padding: 25px;
        white-space: normal;
    }
`

export const StyledContentFlex = styled.div`
    display: flex;
    gap: 20px;
`
export const StyledAllMoneyContainer = styled.div`
    position: relative;

`

export const AllMoneyTitle = styled.div`
    display: flex;
    gap: 12px;
    position: absolute;
    padding: 30px;
    font-size: large;
    color: ${({ theme }) => theme.colors.navy};
    font-weight: 700;

    /* TODO 데이터에 따라 수정 필요 */
    div {
        color: ${({ theme }) => theme.colors.stockRed};;
    }
`