import styled, { css } from "styled-components";


export const Container = styled.div`
    background-color:#F1F5FF;
    max-width:${(props) => props.maxWidth || '500px'};
    height:${(props) => props.height || '224px'};
    padding-left: ${(props) => props.padding || '24px'}; 
    padding-right: ${(props) => props.padding || '24px'}; 
    border-radius: 16px;
    gap: ${(props) => props.gap || '0px'};
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 40px;
`;

export const BankInfo = styled.p`
    visibility: ${(props) => props.infoVisible || 'visible'}; ;
    display:flex;
    gap:20px;
    padding: 10px;
    align-items: center;
    color: #020050;
    font-size: 14px;
    
`;

export const BankTitle = styled.span`
    font-size: 1.2rem;
    font-weight: 600;
    color: #020050;
    

`;

export const BankAmount = styled.span`
`;

export const BalanceContainer = styled.div`
    display:flex;
    gap:24px;
  
`;

export const BalanceRow = styled.div`
   gap:10px;
   display: flex;

`;

export const Label = styled.span`
`;

export const Amount = styled.span`
`;
export const BodyContainer=styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;



`;
export const SliderContainer = styled.div`
  

  .slick-prev:hover:before,
  .slick-next:hover:before {
    color: #0032B7;
  }
  .slick-prev:hover:after,
  .slick-next:hover:after {
    opacity: 0.8;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 26px;
    color: #0046FF;
    opacity: 1;
  }

  .slick-prev {
    left: -25px;
    z-index: 10;
  }

  .slick-next {
    right: -20px;
    
  }
  .slick-list{
    width: ${(props) => props.listWidth|| '480px'}; 
  }
  
  .slick-slide > div > div > div {
  box-shadow: 0 0.4rem 1rem rgba(6, 47, 86, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1); /* 자연스러운 움직임을 위한 커스텀 베지어 */
}

.slick-slide > div > div > div:hover {
  transform: scale(1.05); /* scale 속성은 transform에서 사용해야 함 */
  box-shadow: 0 0.5rem 1rem rgba(6, 47, 86, 0.09); /* 호버 시 box-shadow 효과 강화 */
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1); /* 부드러운 확장 애니메이션 */
}
  .slick-list {
  box-sizing: initial;
  padding: 25px 0px;
}
.slick-prev::before,
.slick-next::before {
  content: '';           /* 기본 화살표를 숨김 */
}

  
`;

export const Slide = styled.div`
   background-color:#FFFFFF;
   padding: 16px;
   border-radius: 14px;
   height: auto;
   width: ${(props) => props.cardWidth|| '160px'}; 
   display: flex; 
   flex-direction: column;
   margin: auto; 
   
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
    font-size:  ${(props) => props.lastTextSize || '14px'};
    color: ${(props) => props.lastTextColor || '#202224'}; 
    white-space: pre-wrap;
`;

