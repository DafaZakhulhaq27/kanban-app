import React from 'react'
import Card from 'react-bootstrap/Card';
import style from './cardGroup.module.css';

const CardEmpty = () => {
  return (
    <Card bg="secondarySurface" border="secondaryBorder" className={style.cardEmptyTask}>
        <p className={style.titleEmpty}>No Task</p>
    </Card>
  )
}

export default CardEmpty