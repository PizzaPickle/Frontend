import styled, { css } from "styled-components";

export const StyledPbontainer = styled.div`
    display: flex;
    margin-left: 20px;
    gap: 50px;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    
    
    .pb-card:hover {
    box-shadow: 0 .2rem 2rem rgba(2, 83, 216, 0.09);
    transition: all 0.1s ease-in;

    }
    
`

export const StyledPbSelectContainer = styled.div`
    display: flex;
    gap: 40px;
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
    width: 330px;
    max-width: 330px;
    min-width: 330px;
    height: 550px;
    justify-content: space-between;
    box-shadow: 0px 10px 10px rgba(0,0,0,0.02);

    #introduction {
            font-size: 0.85rem;
        }

    section {
        color:  ${({ theme }) => theme.colors.deep_gray};

        #name {
            font-size: 1.3rem;
        }
        #location {
            font-size: 0.9rem;
        }
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

    .sector {
        font-size: 0.85rem;
        display: flex;
        flex-direction: column;
        gap: 10px;

        article {
            align-items: center;
        }
    }

    .mainfield, .topics, .ports {
        display: flex;
        gap: 8px;

        div{   
        padding: 5px;
        border-radius: 10px;
        }
        
        #mainfields {
            background-color: aliceblue;
            color: ${({ theme }) => theme.colors.navy};
            padding-left: 10px;
            padding-right: 10px;
        }

        #interests {
            background-color: #F4F1FF;
            color: ${({ theme }) => theme.colors.navy};
            
            padding-left: 10px;
            padding-right: 10px;
        }
        
        #price {
            background-color: #FFFDF3;
            color: ${({ theme }) => theme.colors.navy};
            
            padding-left: 10px;
            padding-right: 10px;
        }

        p{
            font-weight: 500;
            font-size: 0.75rem;
            padding: 5px;
        }
        
    }

    .reserve {
        display: flex;
        justify-content: center;

        
        #reserve-btn {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        gap: 10px;
        color: white;

        background-color:#02004C;
        border: none;
        padding: 20px 50px 20px 50px;
        border-radius: 15px;
        cursor: pointer;

        }
    }

    article {
        font-size: 0.7rem;
    }
`
export const StyledReserveContainer = styled.div`
    
    height: 100%;
    width: 330px;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 300px;

    .DatePick {
    }

    #date-next-btn {
        width: 100%;
        height: 60px;
    }
`

export const StyledPbSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
    margin-bottom: 40px;
    width: 100%;

    article {
        display: flex;
        gap: 20px;
    }

    .filtering {
        display: flex;
        gap: 20px;
        line-height: 2;
        margin-top: 20px;
        margin-bottom: 20px;

        section {
            display: flex;
            gap: 10px;
        }
    }
`

export const StyledFilterImg = styled.div`
    display: flex;
    img {
    width: 20px;
    z-index: 100;
    margin-left: 10px;
    }
`

export const StyledFilterResult = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    .label1 {
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding-right: 8px;
        color: ${({ theme }) => theme.colors.navy};
        font-size: 0.75rem;
        font-weight: 500;
        background-color: #ECF4FF;
        border-radius: 20px;
    }

    .label2 {
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding-right: 8px;
        color: ${({ theme }) => theme.colors.navy};
        font-size: 0.75rem;
        font-weight: 500;
        background-color: #F4F1FF;
        border-radius: 20px;
    }
`

export const StyledDateButton = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;

    div{
        display: flex;
        align-items: center;

        p {
            flex:6;
        }
        #date-next-btn {
            height: 100%;
            width: 50px;
        }

        .reserve-item {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        #reserve-date {
        }
    }
`