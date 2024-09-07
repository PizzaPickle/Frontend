import React, { useState } from 'react';

const CustomArrow = ({ className, style, onClick, direction, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 버튼이 보이지 않도록 처리
  const arrowStyle = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.5s ease', // 부드러운 전환 추가
    background: 'rgba(197, 203, 238, 0.482)',
    border: '1px solid rgba(225, 226, 240, 0.601)',
    backdropFilter: 'blur(10px)',
    width: '40px',
    height: '40px',
    borderRadius: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    cursor: 'pointer'
  };

  const arrowSrc = isHovered
    ? (direction === 'next' ? '/assets/button-next.svg' : '/assets/button-prev.svg')
    : (direction === 'next' ? '/assets/button-next.svg' : '/assets/button-prev.svg');

  return (
    <div
      className={className}
      onClick={onClick}
      style={arrowStyle}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <img
        src={arrowSrc}
        alt={`${direction} arrow`}
        style={{ width: '15px', height: '15px', position: 'absolute' }}
      />
    </div>
  );
};

export default CustomArrow;
