import styled, { css } from "styled-components";

export const StyledRequestDiv = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    section {
        display: flex;
        flex-direction: column;
    }

    

    #next-btn {
        width: 100%;
        position: relative;

        Button {
        font-size: large;
        width: 200px;
        height: 70px;
        position: absolute;
        right: 20px;
        }
    }

`

export const StyledRequestBoxDiv = styled.div`
    display: flex;
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
