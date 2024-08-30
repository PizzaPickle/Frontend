
import React from "react";

// import React from "react";
import Header from "../../components/common/header/Header";
// import Circular from "../../components/common/circular-graph/Circular";
import GraphWithLegend from "../../components/common/graph-width-legend/LegendWithGraph";
import Sidebar from "../../components/common/sidebar/Sidebar";
import StockTable from "../../components/common/stock-table/StockTable";
import StrategyBox from "../../components/common/strategy/box/StrategyBox";

let data = [
  {
    id: "국내주식",
    label: 1,
    value: 0.4,
    color: "#FF6767",
    productList: [
      {
        code: "005930",
        ratio: 30,
        themeName: "반도체",
        name: "삼성전자",
      },
      {
        code: "000660",
        ratio: 70,
        themeName: "반도체",
        name: "하이닉스",
      },
    ],
  },
  {
    id: "해외주식",
    label: 2,
    value: 0.1,
    color: "#FFC27B",
    productList: [
      {
        code: "005930",
        ratio: 25,
        themeName: "반도체",
        name: "해외주식1",
      },
      {
        code: "000660",
        ratio: 75,
        themeName: "반도체",
        name: "해외주식2",
      },
    ],
  },
  {
    id: "채권",
    label: 3,
    value: 0.234,
    color: "#FF8B67",
    productList: [
      {
        code: "005930",
        ratio: 10,
        themeName: "반도체",
        name: "채권1",
      },
      {
        code: "000660",
        ratio: 90,
        themeName: "반도체",
        name: "채권2",
      },
    ],
  },
  {
    id: "ETF",
    label: 4,
    value: 0.404,
    color: "#FFADB6",
    productList: [
      {
        code: "005930",
        ratio: 40,
        themeName: "ETF1",
        name: "삼성전자",
      },
      {
        code: "000660",
        ratio: 60,
        themeName: "ETF2",
        name: "하이닉스",
      },
    ],
  },
  {
    id: "원자재",
    label: 5,
    value: 0.24,
    color: "#ffd9ad",
    productList: [
      {
        code: "005930",
        ratio: 44,
        themeName: "원자재1",
        name: "원자재1원자재1원자재1",
      },
      {
        code: "000660",
        ratio: 56,
        themeName: "원자재2",
        name: "하이닉스",
      },
    ],
  },
];

let productList = [
  {
    code: "005930",
    ratio: 30,
    themeName: "반도체",
    name: "삼성전자",
  },
  {
    code: "000660",
    ratio: 70,
    themeName: "반도체",
    name: "하이닉스",
  },
];

export default function TestPage() {
  return (
    <>


    </>
  );
}
