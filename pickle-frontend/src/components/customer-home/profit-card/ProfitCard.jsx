import React from "react";
import AllMoney from "../../common/mydata/allmoney/AllMoney";

export default function ProfitCard() {
    const slidesData = [
        {
            bankName: "은행기관1",
            accountType: "보통예금",
            productName: "예금상품명1",
            currentBalance: "현재잔액 100,000원"
        },
        {
            bankName: "은행기관2",
            accountType: "보통예금",
            productName: "예금상품명2",
            currentBalance: "현재잔액 200,000원"
        },
        {
            bankName: "은행기관3",
            accountType: "보통예금",
            productName: "예금상품명3",
            currentBalance: "현재잔액 300,000원"
        }
    ];

    const balanceInfoData = [
        { label: "총 잔액", amount: "356,439,000원" },
        { label: "총 출금가능금액", amount: "356,439,000원" }
    ];

    return (
        <AllMoney 
            height={"250px"}
            showNum={2}
            bankTitle="은행"
            balanceInfo={balanceInfoData}
            slides={slidesData}
        />
    );
}