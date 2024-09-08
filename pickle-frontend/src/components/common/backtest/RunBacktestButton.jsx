import React from "react";
import { Button } from "react-bootstrap";

const RunBacktestButton = ({ onClick }) => {
  return (
    <div style={{display: "flex", gap: "10px", paddingBottom: "10px"}}>
      <Button onClick={onClick}>백테스트 진행</Button>
      <Button variant="secondary">전체 백테스트 진행</Button>
    </div>
  );
};

export default RunBacktestButton;
