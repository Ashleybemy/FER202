// src/components/ConfirmModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmModal({
  show,
  title = 'Notification',
  message,
  onConfirm,
  onHide,
  confirmText = 'OK',
  closeText = 'Close',
}) {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {closeText}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
