import styled, { css } from "styled-components";


export const Container = styled.div`
    background-color:#F1F5FF;
    max-width:500px;
    height:224px;
    padding:24px;
    border-radius: 16px;
    
`;

export const BankInfo = styled.p`
    background-color:#F1F5FF;
    display:flex;
    gap:24px;
    align-items: center;
    color: #020050;
    font-size: 14px;
    margin-bottom: 21px;

    
`;

export const BankTitle = styled.span`
    background-color:#F1F5FF;
    font-size: 21px;
    color: #020050;
    

`;

export const BankAmount = styled.span`
    background-color:#F1F5FF;
`;

export const BalanceContainer = styled.div`
    display:flex;
    gap:24px;
  
`;

export const BalanceRow = styled.div`
   background-color:#F1F5FF;
   gap:20px;
   display: flex;


`;

export const Label = styled.span`
   background-color:#F1F5FF;
`;

export const Amount = styled.span`
   background-color:#F1F5FF;
`;

export const SliderContainer = styled.div`


  .slick-prev:hover:before,
  .slick-prev:focus:before,
  .slick-next:hover:before,
  .slick-next:focus:before {
    opacity: 1;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 26px;
    color: #0046FF;
    opacity: 0.8;
  }

  .slick-prev {
    left: -18px;
    z-index: 10;
  }

  .slick-next {
    right: -15px;
  }

  

  .slick-dots {
    bottom: -35px;
    background-color: #F1F5FF;
  }

  .slick-dots li {
    margin: -10px 2px;
    background-color: #F1F5FF;
  }

  .slick-dots li button:before {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #0046FF;
    text-align: center;
    content: '';
  }

  .slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: black;
  }
`;

export const Slide = styled.div`
   background-color:#FFFFFF;
   padding: 16px;
   border-radius: 14px;
   height: auto;
   width: 100px;
   display: flex; 
   flex-direction: column;
   gap: 20px; 
   margin: 0px 10px;
   
   
`;
export const SlideHeader = styled.div`
   background-color:#FFFFFF;
   display: flex;
   gap:5px;
   align-items: center;
   margin-bottom: 15px;
   
`;

export const SlideHeaderName = styled.span`
    background-color:#FFFFFF;
    font-weight:500;
    font-size: 14px; 
    color: #202224; 


`;
export const SlideHeaderKind = styled.span`
    background-color:#FFFFFF;
    font-size: 9px; 
    color: #202224;
    

`;


export const ProductName = styled.div`
    background-color:#FFFFFF;
    font-size: 14px;
    color: #202224;
    margin-bottom: 15px; 
`;

export const CurrentBalance = styled.div`
    background-color:#FFFFFF;
    font-size: 14px;
    color: #202224; 
`;

