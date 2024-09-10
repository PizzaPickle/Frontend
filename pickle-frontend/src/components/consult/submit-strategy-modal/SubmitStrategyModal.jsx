import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function SubmitStrategyModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header id="modal-header" closeButton>
        <Modal.Title>전략에서 삭제하기</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modal-body"></Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          취소
        </Button>
        <Button variant="light">생성하기</Button>
      </Modal.Footer>
    </Modal>
  );
}
