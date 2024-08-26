import React from "react";
import Header from "../../components/common/header/Header";
import Circular from "../../components/common/circular-graph/Circular";

let data = [
  {
    id: "국내주식",
    label: "국내주식",
    value: 40,
    color: "#FF6767",
  },
  {
    id: "해외주식",
    label: "해외주식",
    value: 100,
    color: "#FFC27B",
  },
  {
    id: "채권",
    label: "채권",
    value: 234,
    color: "#FF8B67",
  },
  {
    id: "ETF",
    label: "ETF",
    value: 404,
    color: "#FFADB6",
  },
];

export default function TestPage() {
  return (
    <>
      <Header></Header>
      <Circular width="300px" height="300px" data={data} />
    </>
  );
}
