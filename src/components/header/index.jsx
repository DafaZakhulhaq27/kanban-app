import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import style from './header.module.css';
import { IconPlus } from '../../assets/icons';
import Modal from '../modal';
import Input from '../input';
import { useForm, useModal } from '../../hooks';
import {useSelector,useDispatch} from 'react-redux';
import { addTodo } from '../../stores/todos/todosActions';
import {todosData} from '../../stores/todos/todosSlice';

const Header = () => {
  const dispatch = useDispatch();
  const todos = useSelector(todosData);

  const {
    showModal,
    handleCloseModal,
    handleShowModal
  } = useModal()

  const {
    form,
    handleChange,
  } = useForm()

  const handleOnSubmit = e => {
    e.preventDefault();
    dispatch(addTodo(form));
    handleCloseModal();
  };

  return (
    <>
      <Navbar className={style.header}>
        <Navbar.Brand className={style.navbarBrand}>
          Product Roadmap
          {
            todos.status === 'succeeded' ? 
            <Button className={style.buttonHeader} variant="primary" onClick={handleShowModal} >
              <img className="icon-button" src={IconPlus} alt="icon plus" />
              Add New Group 
            </Button> : null
          }
        </Navbar.Brand>
        <Button className={style.buttonHeader} variant="danger" onClick={handleShowModal} >
          Logout
        </Button>
      </Navbar> 
      <Modal 
        buttonSubmitTitle="Save Group Task"
        title="Create Group Task"
        show={showModal} 
        onSubmit={handleOnSubmit}
        onHide={handleCloseModal} >
          <Input 
            onChange={handleChange}
            label="Title" 
            id="title"
            placeHolder="Type your title" />
          <Input 
            onChange={handleChange}
            label="Description" 
            id="description"
            placeHolder="Type your description" />
      </Modal>  
    </>
  )
}

export default Header