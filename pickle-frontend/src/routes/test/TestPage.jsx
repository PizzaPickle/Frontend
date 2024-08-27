import React from "react";
import Header from "../../components/common/header/Header";
import Circular from "../../components/common/circular-graph/Circular";
import LegendWithGraph from "../../components/common/legend-width-graph/LegendWithGraph";

let data = [
  {
    id: "국내주식",
    label: 1,
    value: 0.40,
    color: "#FF6767",
  },
  {
    id: "해외주식",
    label: 2,
    value: 0.100,
    color: "#FFC27B",
  },
  {
    id: "채권",
    label: 3,
    value: 0.234,
    color: "#FF8B67",
  },
  {
    id: "ETF",
    label: 4,
    value: 0.404,
    color: "#FFADB6",
  },
  {
    id: "원자재",
    label: 5,
    value: 0.24,
    color: "#ffd9ad",
  },
];

export default function TestPage() {
  return (
    <>
      <Header></Header>
      <LegendWithGraph width={600} height={300} data={data}/>
    </>
  );
}
