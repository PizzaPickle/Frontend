import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeProductInSelectedCategory } from "../../../store/reducers/strategy";
import { ProductImg } from "../../consult/search-modal/search-modal.style";

export default function ProductRemoveModal({ show, handleClose, product, category }) {
    const dispatch = useDispatch();

    const removeProduct = () => {
        console.log(product);
        dispatch(removeProductInSelectedCategory({
            categoryId: category,
            productCode: product.code
        }));
        handleClose();
    }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header id="modal-header" closeButton>
          <Modal.Title>전략에서 삭제하기</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body">
          {product ? `${product.name} (${product.code})` : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            취소
          </Button>
          <Button variant="light" onClick={removeProduct}>삭제</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
