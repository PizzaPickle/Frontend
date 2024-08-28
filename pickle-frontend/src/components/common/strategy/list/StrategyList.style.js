import styled, { css } from "styled-components";

export const CardContainer=styled.div`
    width: 310px;
    height: 112px;
    background-color: #F5F8FF;
    border: solid 1.8px rgba(35, 48, 113, 0.11);
    border-radius: 14px;
    padding: 16px;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #D8DFEC; /* hover 시 배경 색상 */
    }

    &:active {
        background-color: #D8DFEC; /* 클릭 또는 선택된 상태에서 배경 색상 */
    }
`;
export const CardHeader=styled.div`
    display: flex;
    gap: 7px;
    align-items: center;
    margin-bottom: 8px;
`;

export const Icon=styled.img`
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 5px;
`
export const CardTitle=styled.div`
    font-size: 14px;
    color: #636566;
`;
export const Create=styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;
export const CreateTag=styled.div`
    font-size: 10px;
    color: #636566;
    font-weight: 500;
`;
export const CreateContent=styled.div`
    font-size: 10px;
    color: #636566;

`;