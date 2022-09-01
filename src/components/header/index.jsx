import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import style from './header.module.css';
import { IconPlus } from '../../assets/icons';
import Modal from '../modal';
import Input from '../input';
import { useModal } from '../../hooks';

const Header = () => {
  const {
    showModal,
    handleCloseModal,
    handleShowModal
  } = useModal()

  const handleOnSubmit = e => {
    e.preventDefault();
    handleCloseModal();
  };

  return (
    <>
      <Navbar className={style.header}>
        <Navbar.Brand className={style.navbarBrand}>
          Product Roadmap
          <Button className={style.buttonHeader} variant="primary" onClick={handleShowModal} >
            <img className="icon-button" src={IconPlus} alt="icon plus" />
            Add New Group 
          </Button>
        </Navbar.Brand>
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