import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import {
  DropDownContainer,
  FilterContainer,
  FilterTag,
  Horizon,
  RadioContainer,
  RadioInput,
  RadioLabel,
  SearchContainer,
  SearchInput,
  SearchText,
} from "./search-modal.style";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function SearchModal({
  activeSearchModal,
  setActiveSearchModal,
}) {
  const [activeCategoryFitler, setActiveCategoryFitler] = useState(false);
  const [activeThemeFilter, setActiveThemeFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleCategoryChange = (e) => {
    setActiveCategoryFitler(false);
    const newValue = e.target.value;
    // 이미 선택된 카테고리를 다시 클릭하면 선택 취소
    if (selectedCategory === newValue) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(newValue);
    }
    console.log(selectedCategory)
  };

  const data = useSelector((state) => state.strategy.data);

  const handleClickCategoryDrop = () => {
    setActiveCategoryFitler((prev) => !prev);
    setActiveThemeFilter(false);
  };

  const handleClickThemeDrop = () => {
    setActiveThemeFilter((prev) => !prev);
    setActiveCategoryFitler(false);
  };

  return (
    <div>
      <Modal
        size="md"
        show={activeSearchModal}
        onHide={() => setActiveSearchModal(false)}
        // aria-labelledby="example-modal-sizes-title-lg"
        id="custom-modal"
      >
        <Modal.Header id="modal-header" closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">종목 검색</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body">
          <SearchContainer>
            <BsSearch
              size={14}
              style={{
                position: "absolute",
                top: "7.5px",
                transform: "translateX(7px)",
              }}
              color="gray"
            />
            <SearchInput placeholder="종목명 혹은 종목코드 입력"/>
            <FilterContainer>
              <FilterTag
                background={selectedCategory ? "#ffd0d0" : "#ced4da"}
                onClick={handleClickCategoryDrop}
              >
                카테고리 {selectedCategory && `﹒${selectedCategory}`}
                <RiArrowDropDownLine size={20} />
              </FilterTag>
              <FilterTag 
              background={selectedTheme? "#dae3ff" : "#ced4da"}
              onClick={handleClickThemeDrop}>
                테마 <RiArrowDropDownLine size={20} />
              </FilterTag>
              {activeCategoryFitler && (
                <DropDownContainer>
                  <SearchContainer padding="10px">
                    <SearchText>카테고리</SearchText>
                    {data.map((category) => (
                      <RadioContainer key={category.id}>
                        <RadioLabel>
                          <RadioInput
                            type="radio"
                            name="category"
                            value={category.id}
                            onChange={handleCategoryChange}
                            checked={selectedCategory === category.id}
                          />
                          {category.id}
                        </RadioLabel>
                      </RadioContainer>
                    ))}
                  </SearchContainer>
                </DropDownContainer>
              )}
              {activeThemeFilter && (
                <DropDownContainer left="5.5rem">
                  <SearchContainer padding="10px">
                    <SearchText>테마</SearchText>
                    <BsSearch
                      size={10}
                      style={{
                        position: "absolute",
                        top: "50px",
                        transform: "translateX(9px)",
                      }}
                      color="gray"
                    />
                    <SearchInput placeholder="카테고리 별 테마 검색" />
                  </SearchContainer>
                </DropDownContainer>
              )}
            </FilterContainer>
            <SearchText>검색결과</SearchText>
            <Horizon />
          </SearchContainer>
        </Modal.Body>
      </Modal>
    </div>
  );
}
