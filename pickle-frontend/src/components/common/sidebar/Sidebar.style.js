import styled, { css } from "styled-components";

export const StyledSideDiv = styled.div`
    position: fixed;
    height: 100%;
    z-index: -1;
    align-content: center;
    box-shadow: 1px 0 0 0 ${({ theme }) => theme.colors.line_gray};
    margin: 10px;
    padding-left: 10px;
    padding-right: 30px;

    .icon {
        width: 15px;
    }
`;

export const StyledSideContent = styled.div`    
    display: flex;
    flex-direction: column;
    gap: 40px;
    color: ${({ theme }) => theme.colors.sidebar};
`;

export const StyledSideText = styled(StyledSideContent)`
    display: flex;
    gap: 15px;
    flex-direction: row;
    
    &:hover {
        color: ${({ theme }) => theme.colors.cobartblue};        
        cursor: pointer;
    }

    span {
        &:hover {
        color: ${({ theme }) => theme.colors.cobartblue};
        }
    }
`;

export const StyledSideTextGroup = styled(StyledSideContent)`
    display: flex;
    gap: 10px;
    flex-direction: column;

    section {
        display: flex;
        gap: 15px;

        &:hover {
            color: ${({ theme }) => theme.colors.cobartblue};
            cursor: pointer;
            }
        }
`;
