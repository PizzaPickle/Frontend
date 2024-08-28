import React from "react";
import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import AllMoney from "../../components/common/mydata/allmoney/AllMoney";
import WalletCard from "../../components/common/wallet-card/WalletCard";

export default function HomePage(){
    
    const walletTexts = ["내 포트폴리오 자산", "총 자산", "투자 여유 금액"]
    const walletAmounts = [7532220, 254032350, 12321200]

    return (
        <>
        <Header/>
        <Sidebar/>
        <WalletCard texts={walletTexts} amounts={walletAmounts}></WalletCard>
        </>
    )
};