import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({showModal, setShowModal, title, msg, action, actionProps }) {
  //const [show, setShow] = useState( showModal);

  const handleClose = () => {
    setShowModal(false)
  }
  function handleAction(){
    action(actionProps.a);
    handleClose();
  }
  //const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title? title: 'Confirm Modal'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{msg? msg: 'Do you want to delete this blog?'}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleAction()}>
           Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;

