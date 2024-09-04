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
    width: 85%;
    height: 97%;
    border-radius: 20x;
    display: flex;
`

export const StyledConsultSide = styled.div`
    background-color: rgba(255,255,255,0.71);
    flex: 1;
    border-radius: 20px 0px 0px 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    div {
        margin-left: 0.7rem;
        margin-right: 0.7rem;
        color: ${({ theme }) => theme.colors.navy};
    }
    
`

export const HighlightBox = styled.div`
    display: ${(props) => (props.visible ? "block" : "none")};
    position: absolute;
    width: 3px;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1; /* 텍스트보다 뒤에 위치 */
    border-radius: 4px; /* 모서리 둥글게 */
`;


export const LinkWrapper = styled.div`
    position: relative;
    margin: 10px 0;
    cursor: pointer;
    padding: 10px; /* 클릭 영역을 넓히기 위해 padding 추가 */
    &:hover {
        border-radius: 20px;
        background-color: rgba(56,63,101,0.08); /* 호버 시 배경색 */
    }
`;


export const StyledLeftContent = styled.div`
    display: flex;
    flex-direction: column;
    flex:4;
    border-right: solid 1px lightgrey;
    background-color: white;
`

export const StyledConsultContentBox = styled.div`
    background-color: white;
    border-radius: 0px 20px 20px 0px;
    flex: 5;
    padding: 20px;
`

export const StyledBacktestHeader = styled.div`
    flex:1;
    background-color: ${({ theme }) => theme.colors.dashboard_gray};
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.line_gray};
    display: flex;
    align-items: center;
    color:  ${({ theme }) => theme.colors.deep_gray};
    
    .user {
        flex: 2;
        margin-left: 20px;
        display: flex;
        gap: 10px;
    }

    Button {
        margin-right: 20px;
        color:  ${({ theme }) => theme.colors.deep_gray};
        border: 1px solid ${({ theme }) => theme.colors.line_gray};

    }
`

export const StyledLeftDiv = styled.div`
    display: flex;
    flex:9;
    flex-direction: column;
    height: 100%;

    .Top {
        flex: 3;
        border-bottom: 1px solid ${({ theme }) => theme.colors.line_gray};
    }

    .Bottom {
        flex: 5;
    }
`
