import styled, { css } from "styled-components";


export const StyledRequestBox = styled.div`
display: flex;
flex-direction: column;
gap: 30px;
padding: 20px;


    img {
        background-color: rgb(255,255,255,0.6);
        padding: 10px;
        border-radius: 10px;
        width:44px;
    }
    section {
        display: flex;
        gap: 20px;
        align-items: center;
    }

    #customer-section { 
        display: flex;
        flex-direction: column;
    }

    section > div > div > span {
        font-weight: 700;
    }

    section > div > div {
        display: flex;
        gap: 10px;
        line-height: 3;
    }
`