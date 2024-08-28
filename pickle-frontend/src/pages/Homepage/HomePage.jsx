import React from "react";
import Header from "../../components/common/header/Header";
import Sidebar from "../../components/common/sidebar/Sidebar";
import AllMoney from "../../components/common/mydata/allmoney/AllMoney";

export default function HomePage(){


    return (
        <>
        <Header/>
        <Sidebar/>
        <AllMoney></AllMoney>
        </>
    )
};