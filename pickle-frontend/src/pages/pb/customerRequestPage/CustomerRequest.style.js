import styled, { css } from "styled-components";


export const StyledRequestButton = styled.div`
  button {
    background: none;
    border: none;
    margin: 30px 10px;
    position: relative;
    font-size: 16px;
    cursor: pointer;
    color:   ${({ theme }) => theme.colors.deep_gray};

    &:hover {
      color:  ${({ theme }) => theme.colors.navy};
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -5px; /* 밑줄과 텍스트 사이의 간격 설정 */
      height: 1px;
      background-color: transparent; /* 기본적으로 투명한 밑줄 */
      transition: background-color 0.2s ease;
    }

    /* 클릭된 상태에 밑줄 유지 */
    &.active::after {
      background-color:  ${({ theme }) => theme.colors.navy};
    }

    &.active {
    color:  ${({ theme }) => theme.colors.navy};
    font-weight: 700;
    }
  }
`;

export const StyledRequestList = styled.div`
display: flex;
flex-direction: column;
gap: 20px;

`

export const StyledRequestListItem = styled.div`
    padding: 40px;
    background-color:  ${({ theme }) => theme.colors.background_deep};
    border-radius: 20px;
    width: 910px;
    opacity: 85%;

    

    ${({ status }) => status === "rejected" && css`
        cursor: default; /* rejected 상태일 때는 cursor: default로 설정 */
        &:hover {
            background-color: ${({ theme }) => theme.colors.background_deep}; /* hover 시 배경색 유지 */
            opacity: 85%;
        }
    `}

    ${({ status }) => status !== "rejected" && css`
    &:hover {
        opacity: 100%;
        background-color: #E8EDF9;
        cursor: pointer;
    }
    `}

    #cust-name {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: 600;
        font-size: larger;
        margin-bottom: 10px;
        color:  ${({ theme }) => theme.colors.navy};

    }

    .detail-box {
        display: flex;
        gap: 20px;
        font-size: 0.85rem;
        color:  ${({ theme }) => theme.colors.deep_gray};
        

        .consult-date, .consult-time {
            span {
                color: ${({ theme }) => theme.colors.deep_gray};
                background-color: rgba(0,0,0,0.04);
            }

            p {
                border: 1px solid ${({ theme }) => theme.colors.line_gray};
                padding: 5px 15px 5px 15px;
                border-radius: 10px;


            }
        }
        div {
            display: flex;
            gap: 10px;
            align-items: center;

            span {
                border-radius: 10px;
                padding: 5px 15px 5px 15px;
                color: ${({ theme }) => theme.colors.deep_gray};
                background-color: rgba(0,0,0,0.04);
            }

            p {
                border: 1px solid ${({ theme }) => theme.colors.line_gray};
                padding: 5px 15px 5px 15px;
                border-radius: 10px;
            }

        }
    }
`