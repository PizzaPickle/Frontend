import styled, { css, keyframes } from "styled-components";

export const shine = keyframes`
  100% {
    left: 125%;
  }
`;

export const StyledMydataSection = styled.div `
  width: 1200px;
  height: auto;

`

export const StyledMyBadge = styled.div`
  position: relative;
  width: 145px;
  height: 145px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;

  &::before {
    position: absolute;
    top: 0;
    left: -75%;
    z-index: 2;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 100%
    );
    transform: skewX(-25deg);
  }

  &:hover::before {
    animation: ${shine} 0.75s;
    background-color: rgba(255, 255, 255, 0.2);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover img {
    opacity: 0.65;
  }
`;

export const StyledMyBadgeBox = styled.div`
  position: relative;

<<<<<<< HEAD
  .badge-info {
    position: absolute;
    min-width: 210px;
    height: auto;
    font-size: 10px;
    top: 10%;
    left: 75%;
    border-radius: 14px;
    padding: 13px;
    background-color: white;
    z-index: 100;
    color: #636566;
=======
    .badge-info {
        position: absolute;
        min-width: 260px;
        height: auto;
        font-size: 0.8rem;
        top: 10%;
        left: 75%;
        border-radius: 14px;
        padding: 13px;
        background-color: white;
        z-index: 100;
        color: #636566;
        
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        pointer-events: none;
    }
>>>>>>> 75ff9730d0b26d260e06eac67fdfd59e82180fab

    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    pointer-events: none;
  }

  &:hover .badge-info {
    opacity: 1;
  }
`;

export const StyledImageText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 10px;

  img {
    width: 120px;
  }

  span {
    font-size: 0.75rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  #text {
    font-size: 0.9rem;
    font-weight: 700;
  }
`;
