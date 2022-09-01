import React from 'react'
import {useSelector} from 'react-redux';
import {todosData} from '../../../stores/todos/todosSlice';
import { CardGroup, Header } from '../../../components'
import style from './home.module.css';

const Home = () => {
  const todos = useSelector(todosData);

  return (
    <>
      <Header />
      <div className={style.homeContainer}>
        {
          todos.data.map((data,index) => {
            let type = 'primary'
            const indicator = Math.floor(Math.random() * (4 - 1 + 1) + 1)

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
                break;
            }

            return <CardGroup type={type} key={index} todo={data} />
          })
        }
      </div>
     </>
  )
}

export default Home