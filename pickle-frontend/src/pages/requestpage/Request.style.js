import styled, { css } from "styled-components";

export const StyledRequestDiv = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    section {
        display: flex;
        flex-direction: column;
    }

    

    #next-btn {
        width: 100%;
        display: flex;
        align-items: end;


        Button {
        font-size: large;
        width: 130px;
        height: 50px;
        }
    }


`

export const StyledRequestBoxDiv = styled.div`
    display: flex;
    h6 {
        margin-top: 20px;
        margin-bottom: 20px;
    }
`

export const StyledOptionSelect = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;

    .form-label {
        margin-bottom: 0;
    }

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
