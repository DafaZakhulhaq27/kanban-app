import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import style from './header.module.css';
import { IconPlus } from '../../assets/icons';
import Modal from '../modal';
import Input from '../input';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleOnSubmit = e => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <>
      <Navbar className={style.header}>
        <Container>
          <Navbar.Brand className={style.navbarBrand}>
            Product Roadmap
            <Button className={style.buttonHeader} variant="primary" onClick={handleShowModal} >
              <img className="icon-button" src={IconPlus} alt="icon plus" />
              Add New Group 
            </Button>
          </Navbar.Brand>
        </Container>
      </Navbar> 
      <Modal 
        buttonSubmitTitle="Save Group Task"
        title="Create Group Task"
        show={showModal} 
        onSubmit={handleOnSubmit}
        onHide={handleCloseModal} >
          <Input 
            label="Title" 
            id="title"
            placeHolder="Type your title" />
          <Input 
            label="Description" 
            id="description"
            placeHolder="Type your description" />
      </Modal>   
    </>
  )
}

export default Header