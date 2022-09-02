import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Input from '../input';
import Modal from '../modal';
import { useModal } from '../../hooks';
import { IconPlusRounded } from '../../assets/icons';
import style from './cardGroup.module.css';
import CardItem from './cardItem';
import CardEmpty from './cardEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { todosData } from '../../stores/todos/todosSlice';
import { fetchTaskItem } from '../../stores/todos/todosActions';
import Loading from './loading';

const CardGroup = ({
        type,
        index,
        todo,
    }) => {
    const dispatch = useDispatch();
    const todos = useSelector(todosData);

    useEffect(() => {
        dispatch(fetchTaskItem({
            id : todo.id,
            index : index
        }));
    },[])

    const {
        showModal,
        handleCloseModal,
        handleShowModal
    } = useModal()
    const handleCreateTask = e => {
        e.preventDefault();
        handleCloseModal();
    };
    
    return (
        <>
            <Card bg={`${type}Surface`} border={`${type}Border`} className={style.cardGroup}>
                <Card bg={`${type}Surface`} border={`${type}Border`} className={style.cardTitleGroup}>
                    <p className={`${style.titleGroup} text-${type}`}>{todo.title}</p> 
                </Card>  
                <p className={style.descGroup}>{todo.description}</p> 
                {
                    todo.isLoading ? 
                    <Loading /> :
                    todo.items.length ?
                    todo.items.map((data,index) => (
                        <CardItem  key={index} task={data} />
                    ))
                    :
                    <CardEmpty />
                }
                <div className="d-flex align-items-center cursor-pointer" onClick={handleShowModal}>
                    <img src={IconPlusRounded} alt="icon plus" width={16.6} height={16.6} />
                    <p className={style.buttonTitleNewTask}>New Task</p>
                </div>
            </Card>    
            <Modal 
                buttonSubmitTitle="Save Task"
                title="Create Task"
                show={showModal} 
                onSubmit={handleCreateTask}
                onHide={handleCloseModal} >
                <Input 
                    label="Task Name" 
                    id="name"
                    placeHolder="Type your task" />
                <div className="w-50">
                    <Input 
                        type="number"
                        label="Progress" 
                        id="progress_percentage"
                        placeHolder="Type your progress" />
                </div>
            </Modal>   
        </>
    )
}

export default CardGroup