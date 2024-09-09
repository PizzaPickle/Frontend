import styled, { keyframes } from 'styled-components';

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

export const StyledConsultingContainer = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    overflow-y: hidden;
`;

export const StyledConsultingMainContent = styled.div`
    display: flex;
`;

export const StyledConsultingContent = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 20px;
    overflow-y: auto;
`;

export const StyledHeadText = styled.div`
    font-size: xx-large;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.navy};
`;

export const StyledConsultingSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
    marginbottom: 25px;

    article {
        display: flex;
        gap: 20px;
    }
`;

export const StyledContentBlock = styled.div`
    display: flex;
    gap: 20px;
    padding: 18px;
    color: ${({ theme }) => theme.colors.navy};
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.background_deep};
`;

export const StyledS1Text = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;

    span {
        font-weight: 700;
    }

    span > div {
        text-align: center;
        marginbottom: 0;
    }

    span > hr {
        border: none;
        height: 6px;
        background-color: #ffe35e;
        margintop: -5px;
        border-radius: 20px;
        marginbottom: 0;
    }

    section {
        display: flex;
        gap: 10px;
        marginleft: 10px;
        marginright: 10px;
        font-size: small;
        background-color: #f6f8ff;
        padding: 10px;
        border-radius: 20px;
    }

    section > div:nth-child(-n + 2) {
        padding-right: 12px;
        border-right: 1px solid ${({ theme }) => theme.colors.line_gray};
    }
`;

export const StyledHead2Text = styled.div`
    font-size: x-large;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.navy};
`;

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
`;

export const StyledContentFlex = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

export const StyledTabs = styled.div`
    display: flex;
    marginbottom: 20px;
`;

export const StyledTab = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    font-weight: ${({ $active }) => ($active ? '600' : '400')};
    color: ${({ $active, theme }) =>
        $active ? theme.colors.navy : theme.colors.gray};
    background-color: transparent;
    border: none;
    border-bottom: 2px solid
        ${({ $active, theme }) => ($active ? theme.colors.navy : 'transparent')};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.navy};
    }
`;

export const StyledTabContent = styled.div`
    margintop: 20px;
`;

export const DeviceSelect = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    marginbottom: 10px;

    select {
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #ccc;
        background-color: white;
        font-size: 14px;
    }
`;

// const PlaceholderContainer = styled.div`
//     width: 100%;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: #f0f0f0;
//     color: #666;
//     font-size: 1.5rem;
//     flex-direction: column;
// `;
