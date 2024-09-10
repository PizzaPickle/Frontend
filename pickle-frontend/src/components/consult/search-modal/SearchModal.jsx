import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import {
  DropDownContainer,
  FilterContainer,
  FilterTag,
  Horizon,
  ItemsContainer,
  ProdcutText,
  ProdcutTextContainer,
  ProdcutTextContainerRight,
  ProductContainer,
  ProductImg,
  RadioContainer,
  RadioInput,
  RadioLabel,
  SearchContainer,
  SearchInput,
  SearchText,
  ThemeClear,
  ThemeListContainer,
  ThemeTag,
} from "./search-modal.style";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { readThemeList, searchProduct } from "../../../api/commonApi";
import { addProductInSelectedCategory } from "../../../store/reducers/strategy";

export default function SearchModal({
  activeSearchModal,
  setActiveSearchModal,
}) {
  const [activeCategoryFitler, setActiveCategoryFitler] = useState(false);
  const [activeThemeFilter, setActiveThemeFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [inputText, setInputText] = useState(null);
  const [filteredThemeList, setFilteredThemeList] = useState([]); // 필터링된 테마 리스트 상태
  const [searchResult, setSearchResult] = useState([]);

  const dispatch = useDispatch();

  const handleCategoryChange = (e) => {
    setActiveCategoryFitler(false);
    const newValue = e.target.value;
    // 이미 선택된 카테고리를 다시 클릭하면 선택 취소
    if (selectedCategory === newValue) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(newValue);
      setSelectedTheme(null);
    }
  };

  const data = useSelector((state) => state.strategy.data);

  const curCategory = data.filter((category) => {
    return category.id === selectedCategory;
  });
  // console.log(curCategory);

  const handleClickCategoryDrop = () => {
    setActiveCategoryFitler((prev) => !prev);
    setActiveThemeFilter(false);
  };

  const handleClickThemeDrop = () => {
    setActiveThemeFilter((prev) => !prev);
    setActiveCategoryFitler(false);
  };

  const activeEnter = async (e) => {
    if (e.key === "Enter") {
      await searchProduct(inputText, selectedCategory, selectedTheme).then(
        (res) => {
          setSearchResult(res.data.items);
        }
      );
    }
  };

  const handleThemeInput = (e) => {
    const inputValue = e.target.value; // 올바른 value 사용
    if (curCategory.length > 0) {
      const filteredThemes = curCategory[0].themeList.filter(
        (theme) => theme.includes(inputValue) // 반환하도록 수정
      );
      setFilteredThemeList(filteredThemes);
      console.log(filteredThemes);
    }
  };

  useEffect(() => {
    if (curCategory.length > 0) {
      setFilteredThemeList(curCategory[0].themeList);
    }
  }, [selectedCategory]);

  const handleClickProduct = (selectedProduct) => {
    console.log(selectedProduct);
    dispatch(addProductInSelectedCategory({
      categoryId : selectedProduct.categoryName,
      product : {
        code: selectedProduct.code,
        ratio: 0,
        themeName: selectedProduct.themeName,
        name: selectedProduct.name,
      }
    }))
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
            <SearchInput
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => activeEnter(e)}
              placeholder="종목명을 입력하세요"
            />
            <FilterContainer>
              <FilterTag
                background={selectedCategory ? "#ffd0d0" : "#ced4da"}
                onClick={handleClickCategoryDrop}
              >
                카테고리 {selectedCategory && `﹒${selectedCategory}`}
                <RiArrowDropDownLine size={20} />
              </FilterTag>
              {selectedCategory && (
                <FilterTag
                  background={selectedTheme ? "#dae3ff" : "#ced4da"}
                  onClick={handleClickThemeDrop}
                >
                  테마 {selectedTheme && `﹒${selectedTheme}`}{" "}
                  <RiArrowDropDownLine size={20} />
                </FilterTag>
              )}
              {activeCategoryFitler && (
                <DropDownContainer>
                  <SearchContainer height="40%" padding="10px">
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
                  <SearchContainer height="40%" padding="10px">
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
                    <SearchInput
                      onChange={handleThemeInput}
                      placeholder="카테고리 별 테마 검색"
                    />
                  </SearchContainer>
                  <ThemeClear onClick={() => setSelectedTheme(null)}>
                    초기화
                  </ThemeClear>
                  <ThemeListContainer>
                    {filteredThemeList?.map((theme) => (
                      <ThemeTag
                        onClick={() => {
                          setSelectedTheme(theme);
                        }}
                        key={theme}
                      >
                        {theme}
                      </ThemeTag>
                    ))}
                  </ThemeListContainer>
                </DropDownContainer>
              )}
            </FilterContainer>
            <SearchText>검색결과</SearchText>
            <Horizon />
            <ItemsContainer>
              {searchResult.map((product) => (
                <ProductContainer
                  onClick={()=>handleClickProduct(product)}
                  key={product.code}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <ProductImg src={product.imgUrl} />
                    <ProdcutTextContainer>
                      <ProdcutText>{product.name}</ProdcutText>
                      <ProdcutText>{product.code}</ProdcutText>
                    </ProdcutTextContainer>
                  </div>
                  <ProdcutTextContainerRight>
                    <ProdcutText>{product.categoryName}</ProdcutText>
                    <ProdcutText>{product.themeName}</ProdcutText>
                  </ProdcutTextContainerRight>
                </ProductContainer>
              ))}
            </ItemsContainer>
          </SearchContainer>
        </Modal.Body>
      </Modal>
    </div>
  );
}
