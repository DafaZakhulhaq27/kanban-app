import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {draggedTask, todosData} from '../../../stores/todos/todosSlice';
import {dragTaskItem, fetchTodo, moveTaskItem, updateTaskItem} from '../../../stores/todos/todosActions';
import { CardGroup, Header, LoadingBackDrop } from '../../../components'
import style from './home.module.css';
import Loading from './loading';
import 'react-toastify/dist/ReactToastify.css';
import { DragDropContext } from "react-beautiful-dnd";

const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector(todosData);
  let indicator =  1;

  useEffect(() => {
    dispatch(fetchTodo());
  },[])

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const taskIndex = result.draggableId.split("_")[1];

    const indexNext = result.destination.droppableId
    const indexSource = result.source.droppableId
    const task = todos.data[indexSource].items[taskIndex]

    if(indexNext === indexSource){
      return
    }
    dispatch(draggedTask({
      indexPrev :indexSource,
      indexNext : indexNext,
      index : taskIndex,
      task : task
    }));    

    dispatch(dragTaskItem({
        idGroup : task.todo_id,
        idTask : task.id,
        indexPrev :indexSource,
        indexNext : indexNext,
        index : taskIndex,
        form : {
            target_todo_id : todos.data[indexNext].id
        }
    }));

    
  };


  return (
    <>
      {
        todos.statusAction === 'loading' ?
        <LoadingBackDrop /> : null
      }  
      <Header />
      <div className={style.homeContainer}>
        {
          todos.status === 'loading' ?
          <Loading />  :
          todos.data.length ?
          <DragDropContext onDragEnd={onDragEnd}>
            {
              todos.data.map((data,index) => {
                let type = 'primary'

                switch (indicator) {
                  case 1:
                    type = 'primary' ;
                    break;
                  case 2:
                    type = 'warning' ;
                    break;
                  case 3:
                    type = 'danger' ;
                    break; 
                  case 4:
                    type = 'success' ;
                    break;                                               
                  default:
                    type = 'primary' ;
                    break;
                  }

                  if(indicator < 4){
                    indicator++
                  }else{
                    indicator = 1
                  }
                
                  return <CardGroup type={type} index={index} key={index} todo={data} />
              })               
            }
          </DragDropContext>
          : 
          <p>Todos Not Found</p>
        }
      </div>
     </>
  )
}

export default Home