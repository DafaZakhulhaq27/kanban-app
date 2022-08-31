import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import style from './header.module.css';
import { IconPlus } from '../../assets/icons';

const Header = () => {
  return (
    <Navbar className={style.header}>
      <Container>
        <Navbar.Brand className={style.navbarBrand}>
          Product Roadmap
          <Button className={style.buttonHeader} variant="primary" >
            <img className="icon-button" src={IconPlus} alt="icon plus" />
            Add New Group 
          </Button>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header