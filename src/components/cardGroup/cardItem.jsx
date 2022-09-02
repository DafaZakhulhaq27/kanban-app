import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Dropdown from 'react-bootstrap/Dropdown';
import { IconArrowLeft, IconArrowRight, IconCheck, IconEdit, IconTrash } from '../../assets/icons';
import style from './cardGroup.module.css';
import { useForm, useModal } from '../../hooks';
import Modal from '../modal';
import CustomToggle from './customToggle';
import { Input } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { todosData } from '../../stores/todos/todosSlice';
import { moveTaskItem, updateTaskItem } from '../../stores/todos/todosActions';


const CardItem = ({
        task,
        index,
        indexGroup,
    }) => {
    const dispatch = useDispatch();
    const todos = useSelector(todosData);
    const percentage = task.progress_percentage ? task.progress_percentage : 0

    // delete
    const {
        showModal : showModalConfirm,
        handleCloseModal : handleCloseModalConfirm,
        handleShowModal : handleShowModalConfirm
      } = useModal()
    const handleOnDelete = e => {
        e.preventDefault();
        handleCloseModalConfirm();
    };

    // update
    const {
        form,
        setForm,
        handleChange,
      } = useForm()
    const {
        showModal : showModalUpdate,
        handleCloseModal : handleCloseModalUpdate,
        handleShowModal : handleShowModalUpdate
    } = useModal()
  
    const handleOnMove = indexNext => {
        dispatch(moveTaskItem({
            idGroup : task.todo_id,
            idTask : task.id,
            indexPrev :indexGroup,
            indexNext : indexNext,
            index : index,
            form : {
                target_todo_id : todos.data[indexNext].id
            }
        }));
    };

    const handleOnUpdate = e => {
        e.preventDefault();
        dispatch(updateTaskItem({
            idGroup : task.todo_id,
            indexGroup :indexGroup,
            idTask : task.id,
            index : index,
            form : {
                ...form,
                target_todo_id : task.todo_id
            } 
        }));
        handleCloseModalUpdate();
    };

    return (
        <Card bg="secondarySurface" border="secondaryBorder" className={style.cardTask}>
            <p className={style.titleTask}>{task.name}</p> 
            <div className={style.divider}></div>
            <div className={style.progressContainer}>
                <div className="d-flex align-items-center">
                    <ProgressBar className={style.progressBar} variant={percentage === 100 ? 'success' : 'primary'} now={percentage} />
                    {
                        percentage === 100 ? 
                        <img src={IconCheck} alt="icon checked" width={16} height={16} /> :
                        <span className={style.progressDesc}>{percentage}%</span> 
                    }
                </div>

                {/* dropdown Menu */}
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} />
                    <Dropdown.Menu align="end" className={style.dropdownMenu}>
                        {
                            todos.data.length !== indexGroup+1 ?
                            <Dropdown.Item 
                                onClick={() => handleOnMove(indexGroup+1)} 
                                className={style.dropdownLink}> 
                                <img className={style.iconDropdown} src={IconArrowRight} alt="icon dropdown" /> Move Right 
                            </Dropdown.Item> : null
                        }
                        {
                            indexGroup !== 0 ?
                            <Dropdown.Item 
                                onClick={() => handleOnMove(indexGroup-1)} 
                                className={style.dropdownLink}> 
                                <img className={style.iconDropdown} src={IconArrowLeft} alt="icon dropdown" /> Move Left 
                            </Dropdown.Item> : null
                        }
                        <Dropdown.Item 
                            className={style.dropdownLink} 
                            onClick={() => {
                                setForm({
                                    name : task.name,
                                    progress_percentage : task.progress_percentage
                                })
                                handleShowModalUpdate()
                            }}> 
                            <img className={style.iconDropdown} src={IconEdit} alt="icon dropdown" /> Edit 
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={handleShowModalConfirm} 
                            className={style.dropdownLink}> 
                            <img className={style.iconDropdown} src={IconTrash} alt="icon dropdown" /> Delete 
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* modal delete */}
                <Modal 
                    isConfirm
                    buttonSubmitTitle="Delete"
                    title="Delete Task"
                    show={showModalConfirm} 
                    onSubmit={handleOnDelete}
                    onHide={handleCloseModalConfirm} >
                    <p className={style.confirmModalDesc}>Are you sure want to delete this task? your action can’t be reverted.</p>
                </Modal>   

                {/* modal update */}
                <Modal 
                    buttonSubmitTitle="Save Change"
                    title="Edit Task"
                    show={showModalUpdate} 
                    onSubmit={handleOnUpdate}
                    onHide={handleCloseModalUpdate} >
                    <Input
                        onChange={handleChange}  
                        value={form.name}
                        label="Task Name" 
                        id="name"
                        placeHolder="Type your task name" />
                    <div className="w-50">
                        <Input
                            onChange={handleChange}  
                            value={form.progress_percentage}
                            type="number"
                            label="Progress" 
                            id="progress_percentage"
                            placeHolder="Type your progress" />
                    </div>
                </Modal>               
            </div>
        </Card> 
    )
}

export default CardItem