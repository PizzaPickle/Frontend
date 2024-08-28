import React from "react";
import WalletCard from "../../components/common/wallet-card/WalletCard";

export default function TestPage() {
  const num1 = 7532220;
  const num2 = 254032350;
  const num3 = 12321200;

  return (
    <>
    <WalletCard text1="내 포트폴리오 자산" text2="총 자산" text3="투자 여유 금액"
    data1={num1} data2={num2} data3={num3}></WalletCard>
    </>
  );
}
