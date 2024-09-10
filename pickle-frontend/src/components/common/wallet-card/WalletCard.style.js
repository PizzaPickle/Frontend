import styled, { css } from "styled-components";

export const StyeldWalletContainer = styled.div`
    width: ${(props) => props.width || '300px'};
    height: ${(props) => props.width || '240px'};
    background: linear-gradient(
    140deg,
    #0B39DC 0%, 
    #2559E5 19%,       
    #4467E3 69%,     
    #466FD7 82%,      
    #6682E6 100%    
    );
    background-size: cover;
    border-radius: 20px;
    padding: 25px;
    color: white;
`

export const StyledIconAndText = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

export const StyledWalletText = styled(StyledIconAndText)`
    font-weight: 700;
    font-size: large;
`

export const StyledWalletGroup = styled.div`
    display: flex;
    gap: 30px;

    section {
    }
`

export const StyledWalletTextGroup = styled.div`
    display: flex;
    flex-direction: column;

    padding-top: 20px;
    padding-bottom: 20px;
`

