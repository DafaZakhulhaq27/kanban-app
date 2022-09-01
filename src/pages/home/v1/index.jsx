import React from 'react'
import { CardGroup, Header } from '../../../components'
import style from './home.module.css';

const Home = () => {

  const dummyTodo = [
    {
      "id": 3,
      "title": "Group Task 3",
      "created_by": "1",
      "created_at": "2021-04-21T00:40:08.724Z",
      "updated_at": "2021-05-05T15:34:31.805Z",
      "description": "July - September"
  },
  {
      "id": 82,
      "title": "Group Task 4",
      "created_by": "1",
      "created_at": "2021-05-08T15:24:32.607Z",
      "updated_at": "2021-05-08T15:24:32.607Z",
      "description": "October - Desember"
  },
  {
    "id": 3,
    "title": "Group Task 3",
    "created_by": "1",
    "created_at": "2021-04-21T00:40:08.724Z",
    "updated_at": "2021-05-05T15:34:31.805Z",
    "description": "July - September"
},
{
    "id": 82,
    "title": "Group Task 4",
    "created_by": "1",
    "created_at": "2021-05-08T15:24:32.607Z",
    "updated_at": "2021-05-08T15:24:32.607Z",
    "description": "October - Desember"
},
  ]

  return (
    <>
      <Header />
      <div className={style.homeContainer}>
        {
          dummyTodo.map((data,index) => {
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