// src/components/RunBacktestButton.js
import React from 'react';
import { Button } from 'react-bootstrap';

const RunBacktestButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>백테스트 진행</Button>
  );
};

export default RunBacktestButton;
