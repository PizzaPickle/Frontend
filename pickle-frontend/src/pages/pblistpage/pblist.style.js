import styled, { css } from "styled-components";

export const StyledPbontainer = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    
`

export const StyledPbSelectContainer = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    width: 100%;

    section {
        display: flex;
        gap: 30px;
    }
`

export const StyledPbCard = styled.div`
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 40px;
    width: 300px;
    max-width: 300px;
    height: 600px;
    justify-content: space-between;

    section {
    }

    .self-introduce {
        
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 15px;


        #name {
            font-size: x-large;
            font-weight: 700;
        }
    }

    .interest {
        font-size: 0.85rem;
        display: flex;
        flex-direction: column;
        gap: 10px;

        article {
            align-items: center;
        }
    }

    .mainfields, .topics {
        display: flex;
        gap: 8px;

        div{   
        padding: 5px;
        background-color: aliceblue;
        border-radius: 10px;
        }
    }

    .reserve {
        display: flex;
        justify-content: center;
        
        .reserve-btn {
        width: 90%;
        display: flex;
        justify-content: center;
        gap: 10px;

        }
    }
`
export const StyledReserveContainer = styled.div`
    
    height: 100%;

    .DatePick {
        width: 800px;
    }
`

export const StyledPbSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
    margin-bottom: 25px;
    height: 100%;
    width: 100%;

    article {
        display: flex;
        gap: 20px;
    }
`
