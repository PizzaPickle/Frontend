import styled, { css } from "styled-components";

export const StyledGraphDiv = styled.div`
    
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    background-color: white;
    border-radius: 7px;
    border: 1px solid rgba(201,201,201,0.5);
    width: ${(props) => props.width || '800px'};

    section {
        display: flex;
        gap: 20px;
        font-size: small;
        justify-content: space-around;

        p {
        font-size: smaller;
        border-radius: 8px;
        display: flex;
        align-items: center;
        }
        
    }

`;

export const StyledColorLegend = styled.div`
    section {
        background-color: ${(props) => props.color || '800px'};

    }
`
