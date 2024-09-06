import React from 'react';
import { useState } from 'react';

const CustomArrow = ({ className, style, onClick, direction }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Hover 시 이미지 경로를 변경
    const arrowSrc = direction === 'next'
      ? (isHovered ? '/assets/button-next.svg' : '/assets/next.svg')
      : (isHovered ? '/assets/button-prev.svg' : '/assets/prev.svg');
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        background: 'blue',
        color: 'white',
        width: '30px',
        height: '35px',
        borderRadius: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        transition: 'background 0.3s ease', // 부드러운 배경 전환
        cursor: 'pointer',
      }}
      onMouseOver={(e) => {
        setIsHovered(true); // hover 시 상태 변경
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'blue'; // hover 해제 시 배경색 복귀
        setIsHovered(false); // hover 해제 시 상태 복귀
      }}
    >
    <img
        src={direction === 'next' ? '/assets/button-next.svg' : '/assets/button-prev.svg'}
        alt={`${direction} arrow`}
        style={{ width: '20px', height: '20px', position:"absolute"}} // SVG 이미지 크기 조정
      />
    </div>
  );
};

export default CustomArrow;