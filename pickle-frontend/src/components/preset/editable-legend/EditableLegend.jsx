import React from "react";
import { useState } from "react";
import {
  ColorCircle,
  LegendDiv,
  LegendInput,
  LegendLeftContainer,
  LegendText,
} from "./editable-legend.style";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryValueById } from "../../../store/reducers/preset";

export default function EditableLegend({ category }) {
  const [value, setValue] = useState(category.value);

  const dispatch = useDispatch();
  // const category

  const handleTextInput = (e) => {
    let newValue = e.target.value;

    // 숫자 값을 파싱하여 범위 내에 있는지 확인
    if (newValue >= 0 && newValue <= 100) {
      setValue(newValue); // 상태 업데이트
      dispatch(
        updateCategoryValueById({
          categoryId: category.id,
          newValue: newValue,
        })
      );
    }
  };

  return (
    <LegendDiv>
      <LegendLeftContainer>
        <ColorCircle color={category.color}></ColorCircle>
        <LegendText>{category.id}</LegendText>
      </LegendLeftContainer>
      <div
        style={{
          display: "flex",
        }}
      >
        <LegendInput
          type="number"
          min="0"
          max="100"
          value={value}
          onChange={handleTextInput}
        ></LegendInput>
        <LegendText>%</LegendText>
      </div>
    </LegendDiv>
  );
}
