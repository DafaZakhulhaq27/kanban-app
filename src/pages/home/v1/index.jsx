import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {todosData} from '../../../stores/todos/todosSlice';
import {fetchTodo} from '../../../stores/todos/todosActions';
import { CardGroup, Header, LoadingBackDrop } from '../../../components'
import style from './home.module.css';
import Loading from './loading';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector(todosData);
  let indicator =  1;

  useEffect(() => {
    dispatch(fetchTodo());
  },[])

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
          }) : 
          <p>Todos Not Found</p>
        }
      </div>
     </>
  )
}

export default Home