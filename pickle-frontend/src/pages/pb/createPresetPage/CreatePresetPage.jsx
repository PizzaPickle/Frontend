import React, { useState } from "react";
import {
  StyledContentBlock,
  StyledHead2Text,
  StyledHomeContainer,
  StyledHomeContent,
  StyledHomeMainContent,
} from "../../homePage/HomePage.style";
import Header from "../../../components/common/header/Header";
import Sidebar from "../../../components/common/sidebar/Sidebar";
import {
  AlertContainer,
  Bolder,
  CategoryInfo,
  CategoryInfoContainer,
  ColorCircle,
  LegendDiv,
  LegendListDiv,
  ProductInput,
  ProductInputButton,
} from "../../backtestPage/BacktestPage.style";
import Circular from "../../../components/common/circular-graph/Circular";
import EditableLegend from "../../../components/preset/editable-legend/EditableLegend";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../../store/reducers/preset";
import {
  GraphWithLegendContainer,
  LeftContainer,
  StockTableContainer,
} from "../presetPage/Preset.style";
import { BsSearch } from "react-icons/bs";
import SearchModal from "../../../components/preset/search-modal/SearchModal";
import BacktestChart from "../../../components/preset/backtest-chart/BacktestChart";
import { Button } from "react-bootstrap";
import EditableStockTable from "../../../components/preset/editable-stock-table/EditableStockTable";

export default function CreatePresetPage() {
  const dispatch = useDispatch();
  const [activeSearchModal, setActiveSearchModal] = useState(false);

  const data = useSelector((state) => state.preset.data);
  const isValidCategoryRatio = useSelector(
    (state) => state.preset.isValidCategoryRatio
  );

  const handleClickLegend = (category) => {
    dispatch(
      selectCategory({
        categoryId: category.id,
      })
    );
  };

  const selectedCategoryProduct = useSelector((state) => {
    let curCategory;
    state.preset.data.map((category) => {
      if (category.selected) {
        curCategory = category;
      }
    });
    return curCategory;
  });

  return (
    <StyledHomeContainer>
      <Header />
      <StyledHomeMainContent>
        <Sidebar />
        <StyledHomeContent style={{ padding: "40px" }}>
          <div style={{display: "flex", gap: "20px"}}>
            <StyledHead2Text>프리셋 생성하기</StyledHead2Text>
            <Button>프리셋 저장</Button>
          </div>
          <div style={{ height: "10px", width: "100%" }}></div>
          <StyledContentBlock>
            <LeftContainer>
              <GraphWithLegendContainer>
                <Circular
                  data={data}
                  top={"20%"}
                  left={"-5%"}
                  width={"350px"}
                  height={"250px"}
                />
                <LegendDiv>
                  <LegendListDiv>
                    {data.map((category) => (
                      <span
                        onClick={() => handleClickLegend(category)}
                        key={category.label}
                      >
                        <EditableLegend category={category} />
                      </span>
                    ))}
                  </LegendListDiv>
                </LegendDiv>
                {!isValidCategoryRatio && (
                  <AlertContainer>비율 합은 100이여야 합니다.</AlertContainer>
                )}
              </GraphWithLegendContainer>
              <StockTableContainer>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <CategoryInfoContainer>
                    <ColorCircle
                      color={selectedCategoryProduct.color}
                    ></ColorCircle>
                    <CategoryInfo>
                      <Bolder>{selectedCategoryProduct.id}</Bolder> 종목 구성
                    </CategoryInfo>
                  </CategoryInfoContainer>
                  {/* 예시용 input임 */}
                  <div onClick={() => setActiveSearchModal(true)}>
                    <ProductInput placeholder="종목명 입력" />
                    <ProductInputButton>
                      <BsSearch
                        color="white"
                        style={{ transform: "translateY(-2px)" }}
                      />
                    </ProductInputButton>
                  </div>
                </div>
                <EditableStockTable
                  category={selectedCategoryProduct}
                  productList={selectedCategoryProduct.productList}
                  width={`90%`}
                />
              </StockTableContainer>
            </LeftContainer>
            <BacktestChart width={"100%"} />
          </StyledContentBlock>
        </StyledHomeContent>
      </StyledHomeMainContent>
      {activeSearchModal && (
        <SearchModal
          activeSearchModal={activeSearchModal}
          setActiveSearchModal={setActiveSearchModal}
        />
      )}
    </StyledHomeContainer>
  );
}
