import React from 'react'
import Form from 'react-bootstrap/Form';
import style from './input.module.css';

const InputDefault = ({
    label,
    type,
    placeHolder,
    onChange,
    required,
    id,
    value,
}) => {
  return (
    <Form.Group className={style.formContainer} controlId={id}>
        <Form.Label className={style.formLabel}>{label}</Form.Label>
        <Form.Control
            value={value}
            max={100}
            min={0} 
            required={required}
            name={id}
            className={style.formInput} 
            type={type} 
            placeholder={placeHolder}
            onChange={onChange} />
    </Form.Group>      
  )
}

InputDefault.defaultProps = {
    type : 'text',
    required : true
}

export default InputDefault