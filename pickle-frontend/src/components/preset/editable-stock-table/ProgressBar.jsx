import {
  BackgroundBar,
  GaugeBar,
  PercentText,
  PercentInput,
  PercentContainer,
} from "./prgressBar.style";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProductRatio } from "../../../store/reducers/preset";

export default function ProgressBar({ category, ratio, product }) {
  const [curRatio, setCurRatio] = useState(ratio);
  const dispatch = useDispatch();

  const handleTextInput = (e) => {
    let newValue = Number(e.target.value);
    // console.log(Number(e.target.value));

    // 숫자 값을 파싱하여 범위 내에 있는지 확인
    if (newValue >= 0 && newValue <= 100) {
      setCurRatio(newValue); // 상태 업데이트
      dispatch(
        updateProductRatio({
          categoryId: category.id,
          productCode: product.code,
          ratio: newValue,
        })
      );
    }
  };

  return (
    <div>
      <BackgroundBar>
        <GaugeBar width={`${curRatio ? curRatio: 0}%`}></GaugeBar>
        {/* <PercentContainer> */}
          <PercentInput onChange={handleTextInput} value={curRatio} />
          <PercentText>%</PercentText>
        {/* </PercentContainer> */}
      </BackgroundBar>
    </div>
  );
}
