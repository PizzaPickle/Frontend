import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Termspage.css";

// Modal 컴포넌트 정의
// function Modal({ isOpen, onClose, children }) {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-tent" onClick={(e) => e.stopPropagation()}>
//         <button className="modal-close-button" onClick={onClose}>
//           &times;
//         </button>
//         <div className="modal-body">{children}</div>
//       </div>
//     </div>
//   );
// }


export default function TermsPage() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [isExpanded1, setIsExpanded1] = useState(true);
  const [isExpanded2, setIsExpanded2] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [checkbox2, setCheckBox2] = useState({
    firstAgreed: false,
    firstUseAgreed: false,
  });

  const [checkbox, setCheckBox] = useState({
    allAgreed: false, // 전체 동의 체크박스
    assetAgreement: false, // 마이데이터 자산 목록 전송요구 동의
    infoCollectionAgreement: false, // 개인(신용) 정보 수집·이용 동의
    infoProvideAgreement: false, // 개인(신용) 정보 제공 동의
    idVerificationAgreement: false, // 신원 확인서비스 이용약관 동의
    personalDataAgreement: false, // 개인정보 처리 동의
  });

  // 모든 상위 체크박스가 체크되었을 때 경로 이동
  const checkAndNavigate = () => {
    if (checkbox2.firstAgreed && checkbox.allAgreed) {
      navigate("/progress");
    }
  };

  // useEffect로 checkbox 상태가 변경될 때마다 checkAndNavigate를 실행
  useEffect(() => {
    checkAndNavigate();
  }, [checkbox2, checkbox]); // checkbox2와 checkbox 상태가 변경될 때마다 실행

  const handleCheckboxChange2 = (name) => {
    setCheckBox2((prev) => {
      const newState2 = { ...prev, [name]: !prev[name] };

      const firstAllChecked = newState2.firstUseAgreed;
      newState2.firstAgreed = firstAllChecked;

      return newState2;
    });
  };

  const handleCheckboxChange = (name) => {
    setCheckBox((prev) => {
      const newState = { ...prev, [name]: !prev[name] };

      // 모든 개별 체크박스가 선택되었을 때 전체 동의 체크박스를 자동으로 선택
      const allChecked =
        newState.assetAgreement &&
        newState.infoCollectionAgreement &&
        newState.infoProvideAgreement &&
        newState.idVerificationAgreement &&
        newState.personalDataAgreement;

      newState.allAgreed = allChecked;

      return newState;
    });
  };

  return (
    <div className="terms-container">
      <header className="logo">
        <p>피클 로고</p>
      </header>

      <div className="terms-section">
        {/* 1번 섹션 */}
        <div
          className="terms-header"
          onClick={() => setIsExpanded1(!isExpanded1)} // 토글 기능
        >
          {/* <input type="checkbox" checked={checkbox2.firstAgreed} readOnly /> */}
          <label className="main-label">
            마이데이터 서비스 가입 관련 전체 동의
          </label>
        </div>

        {isExpanded1 && (
          <div className="terms-details">
            {/* 1번 섹션의 확장 가능한 내용 */}
            <div className="terms-item">
              <input
                type="checkbox"
                checked={checkbox2.firstUseAgreed}
                onChange={() => handleCheckboxChange2("firstUseAgreed")}
              />
              <label>(필수) 마이데이터 서비스 이용약관 동의</label>
              <span className={`arrow ${isExpanded1 ? "open" : ""}`}></span>
              <button
                className="arrow-button"
                onClick={(e) => {
                  e.stopPropagation(); // 섹션 접힘 방지
                  setIsModalOpen(true); // 모달 열기
                }}
              >
                ⯈ {/* 화살표 표시 */}
              </button>
            </div>
          </div>
        )}

        {/* 2번 섹션 */}
        <div
          className="terms-header"
          onClick={() => setIsExpanded2(!isExpanded2)} // 토글 기능
        >
          {/* <input type="checkbox" checked={checkbox.allAgreed} readOnly /> */}
          <label className="main-label">금융사 정보 조회 관련 전체 동의</label>
          <span className={`arrow ${isExpanded2 ? "open" : ""}`}></span>
        </div>

        {isExpanded2 && (
          <div className="terms-details">
            {/* 2번 섹션의 확장 가능한 내용 */}
            <div className="terms-item">
              <input
                type="checkbox"
                checked={checkbox.assetAgreement}
                onChange={() => handleCheckboxChange("assetAgreement")}
              />
              <label>(필수) 마이데이터 자산 목록 전송요구 동의</label>
            </div>
            <div className="terms-item">
              <input
                type="checkbox"
                checked={checkbox.infoCollectionAgreement}
                onChange={() => handleCheckboxChange("infoCollectionAgreement")}
              />
              <label>
                (필수) 마이데이터 이용을 위한 개인(신용) 정보 수집·이용 동의
              </label>
            </div>
            <div className="terms-item">
              <input
                type="checkbox"
                checked={checkbox.infoProvideAgreement}
                onChange={() => handleCheckboxChange("infoProvideAgreement")}
              />
              <label>
                (필수) 마이데이터 이용을 위한 개인(신용) 정보 제공 동의
              </label>
            </div>
            <div className="terms-item">
              <input
                type="checkbox"
                checked={checkbox.idVerificationAgreement}
                onChange={() => handleCheckboxChange("idVerificationAgreement")}
              />
              <label>
                (필수) 마이데이터 통합자금을 위한 신원 확인서비스 이용약관 동의
              </label>
            </div>
            <div className="terms-item">
              <input
                type="checkbox"
                checked={checkbox.personalDataAgreement}
                onChange={() => handleCheckboxChange("personalDataAgreement")}
              />
              <label>
                (필수) 마이데이터 통합인증을 위한 개인정보 처리 동의
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 모달 컴포넌트 */}
      <Modal id="custom-modal" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>[개인정보 취급 위탁에 대한 동의]</h3>
        <p>
          본인 확인 서비스 제공을 위해 개인정보 취급 위탁 동의를 받고자 합니다.
          아래 내용을 자세히 읽고 동의 여부를 결정해주세요.
        </p>
        <ul>
          <li>∙ 수탁자: 피클(PICKLE)</li>
          <li>
            • 개인정보 수집 및 이용 목적: 포트폴리오 추천 등에 필요한 개인화
            서비스 제공
          </li>
          <li>• 수집하는 개인정보 항목:</li>
          <ul>
            <li>
              - 금융 정보: 계좌번호 및 은행명, 증권 계좌 및 투자 종목 내역, 대출
              및 부채 정보, 부동산 자산
            </li>
            <li>
              - 거래 정보: 거래 내역(입출금 내역, 신용 자산 거래 내역), 금융
              상품 가입 내역, 투자 내역
            </li>
          </ul>
          <li>• 개인정보 보유 및 이용 기간: 수집일로부터 3년</li>
        </ul>
        <p>
          ※ 귀하께서는 동의하지 않을 권리가 있습니다. 동의하지 않을 경우
          서비스를 이용할 수 없음을 알려드립니다.
        </p>
        <p>개인정보 취급 위탁에 대해 동의하시나요?</p>
      </Modal>
    </div>
  );
}
