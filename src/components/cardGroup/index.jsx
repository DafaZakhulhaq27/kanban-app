import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Input from '../input';
import Modal from '../modal';
import { useForm, useModal } from '../../hooks';
import { IconPlusRounded } from '../../assets/icons';
import style from './cardGroup.module.css';
import CardItem from './cardItem';
import CardEmpty from './cardEmpty';
import { useDispatch } from 'react-redux';
import { addTaskItem, fetchTaskItem } from '../../stores/todos/todosActions';
import Loading from './loading';
import { Droppable } from "react-beautiful-dnd";

const CardGroup = ({
        type,
        index,
        todo,
    }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTaskItem({
            id : todo.id,
            index : index
        }));
    },[])

    const {
        form,
        handleChange,
    } = useForm()

    const {
        showModal,
        handleCloseModal,
        handleShowModal
    } = useModal()
    const handleCreateTask = e => {
        e.preventDefault();
        dispatch(addTaskItem({
            index : index,
            id : todo.id,
            form : form   
        }));
        handleCloseModal();
    };
    
    return (
        <>
                    <Card  bg={`${type}Surface`} border={`${type}Border`} className={style.cardGroup}>
                        <Card bg={`${type}Surface`} border={`${type}Border`} className={style.cardTitleGroup}>
                            <p className={`${style.titleGroup} text-${type}`}>{todo.title}</p> 
                        </Card>  
                        <p className={style.descGroup}>{todo.description}</p> 
                        {
                            todo.isLoading ? 
                            <Loading /> :
                            <Droppable droppableId={`${index}`}>
                                {(provided) => (
                                <div  {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        todo.items.length ?
                                        todo.items.map((data,indexTask) => (
                                            <CardItem indexGroup={index} index={indexTask} key={indexTask} task={data} />
                                        )) :
                                        <CardEmpty />
                                    }
                                    {provided.placeholder}
                                </div>
                                )}
                            </Droppable>     
                            
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
                    onChange={handleChange} 
                    label="Task Name" 
                    id="name"
                    placeHolder="Type your task" />
                <div className="w-50">
                    <Input 
                        onChange={handleChange}
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