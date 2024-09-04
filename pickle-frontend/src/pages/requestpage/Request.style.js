import styled, { css } from "styled-components";

export const StyledRequestDiv = styled.div`
    width: 100%;
    display: flex;
    gap: 15px;

    section {
        display: flex;
        flex-direction: column;
    }
`

export const StyledOptionSelect = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;

    section {
        display: flex;
        flex-direction: row;
        gap: 30px;

        div {
            display: flex;
            flex-direction: row;
            background-color: white;
            padding: 10px;
            border-radius: 20px;
        }
    }

    .option {
        padding: 10px;
        border-radius: 20px;
        cursor: pointer;

        p {
            margin-bottom: 0px !important;
        }
    }

    .selected {
        padding: 10px;
        border-radius: 20px;
        cursor: pointer;
        background-color: #F4F4F4; 

        p {
            margin-bottom: 0px !important;
        }
    
     }
`
