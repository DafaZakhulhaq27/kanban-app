import React from 'react'
import style from './loadingBackDrop.module.css';

const LoadingBackdrop = () => {
  return (
    <div className={style.loadingBackDrop}>
      <div class={style.loadingRing}></div>
    </div>
  )
}

export default LoadingBackdrop