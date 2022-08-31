import React from 'react'
import Form from 'react-bootstrap/Form';
import style from './input.module.css';

const InputDefault = ({
    label,
    type,
    placeHolder,
    onChange,
    id,
}) => {
  return (
    <Form.Group className={style.formContainer} controlId={id}>
        <Form.Label className={style.formLabel}>{label}</Form.Label>
        <Form.Control 
            id={id}
            name={id}
            className={style.formInput} 
            type={type} 
            placeholder={placeHolder}
            onChange={onChange} />
    </Form.Group>      
  )
}

InputDefault.defaultProps = {
    type : 'text'
}

export default InputDefault