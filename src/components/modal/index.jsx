import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './modal.module.css';
import Form from 'react-bootstrap/Form';
import { IconDanger } from '../../assets/icons';

const ModalDefault = ({
    show,
    onHide,
    children,
    title,
    buttonSubmitTitle,
    buttonSubmitType,
    buttonCanceTitle,
    buttonCancelType,
    onSubmit,
    isConfirm
}) => {
  return (
    <Modal show={show} onHide={onHide} className={style.modalContainer} centered>
        <Modal.Header className={style.modalLayout} closeButton>
            <Modal.Title className={style.modalTitle}> {isConfirm ? <img src={IconDanger} alt="icon danger" className={style.iconButtonHeader} /> : null}  {title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>        
            <Modal.Body className={style.modalBody}>
                {children}
            </Modal.Body>
            <Modal.Footer className={style.modalLayout}>
                <Button variant={buttonCancelType} onClick={onHide}>
                    {buttonCanceTitle}
                </Button>
                <Button type="submit" variant={isConfirm ? 'danger' : buttonSubmitType}>
                    {buttonSubmitTitle}
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
  )
}

ModalDefault.defaultProps = {
    buttonSubmitType : 'primary',
    buttonCancelType : 'light',
    buttonCanceTitle : 'cancel'
}

export default ModalDefault