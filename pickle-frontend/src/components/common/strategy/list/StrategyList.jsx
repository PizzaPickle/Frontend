import React from "react";
import{
    CardContainer,
    CardHeader,
    CardTitle,
    Create,
    CreateTag,
    CreateContent,
    Icon

} from "./StrategyList.style"

export default function StrategyList(isRebalanced) {
    if (isRebalanced==1){ 
        return (
        <CardContainer>
            <CardHeader>
                <Icon src="/assets/strategy.svg"></Icon>
                <CardTitle>중위험 ETF 전략</CardTitle>
            </CardHeader>
            <Create>
                <CreateTag>생성자</CreateTag>
                <CreateContent>윤재욱 PB</CreateContent>

            </Create>
            <Create>
                <CreateTag>전략 생성 일시</CreateTag>
                <CreateContent>20240821 09:33</CreateContent>
            </Create>
            <Create>
                <CreateTag>자산 구성</CreateTag>
                <CreateContent>국내 주식, 해외 주식, ETF, 채권</CreateContent>
            </Create>
        </CardContainer>
    )}
    else{
        return (
            <CardContainer>
            <CardHeader>
                <Icon src="/assets/folder.svg"></Icon>
                <CardTitle>20240821 리밸런싱</CardTitle>
            </CardHeader>
            <Create>
                <CreateTag>생성자</CreateTag>
                <CreateContent>나</CreateContent>

            </Create>
            <Create>
                <CreateTag>리밸런싱 일시</CreateTag>
                <CreateContent>20240821 09:33</CreateContent>
            </Create>
            <Create>
                <CreateTag>자산 구성</CreateTag>
                <CreateContent>국내 주식, 해외 주식, ETF, 채권</CreateContent>
            </Create>
            </CardContainer>
        )
    }
};