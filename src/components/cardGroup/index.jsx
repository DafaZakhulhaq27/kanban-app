import React from 'react'
import Card from 'react-bootstrap/Card';
import Input from '../input';
import Modal from '../modal';
import { useModal } from '../../hooks';
import { IconPlusRounded } from '../../assets/icons';
import style from './cardGroup.module.css';
import CardItem from './cardItem';
import CardEmpty from './cardEmpty';

const CardGroup = ({
        type,
        todo,
    }) => {

    const {
        showModal,
        handleCloseModal,
        handleShowModal
    } = useModal()
    const handleCreateTask = e => {
        e.preventDefault();
        handleCloseModal();
    };

    const task = [
        {
            "id": 1,
            "name": "Redesign page",
            "done": null,
            "todo_id": 1,
            "created_at": "2021-04-21T00:12:06.116Z",
            "updated_at": "2021-04-21T00:12:06.116Z",
            "progress_percentage": null
        },
        {
            "id": 2,
            "name": "Redesign page part 2",
            "done": null,
            "todo_id": 1,
            "created_at": "2021-04-21T00:14:38.397Z",
            "updated_at": "2021-04-21T00:14:38.397Z",
            "progress_percentage": 60
        }
    ]

    return (
        <>
            <Card bg={`${type}Surface`} border={`${type}Border`} className={style.cardGroup}>
                <Card bg={`${type}Surface`} border={`${type}Border`} className={style.cardTitleGroup}>
                    <p className={`${style.titleGroup} text-${type}`}>{todo.title}</p> 
                </Card>  
                <p className={style.descGroup}>{todo.description}</p>   
                {
                    task.length ?
                    task.map((data,index) => (
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