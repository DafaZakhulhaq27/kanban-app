import React from 'react'
import style from './home.module.css';

const Loading = () => {
  return (
    <div className="d-flex flex-wrap">
        <div className={style.loading}></div>
        <div className={style.loading}></div>
    </div>
  )
}

export default Loading