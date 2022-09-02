import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import style from '../../login/v1//login.module.css'
import Form from 'react-bootstrap/Form';
import { Input } from '../../../components';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { HOME, LOGIN } from '../../../navigation/routesName';
import { useForm } from '../../../hooks';
import { axios, errorResponse, toastError } from '../../../config';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {
        form,
        handleChange,
    } = useForm()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.post("/signup", form);
            localStorage.setItem('token_kanban', response.data.auth_token);
            navigate(HOME);
        } catch (err) {
            toast(errorResponse(err), toastError)
        } finally {
            setIsLoading(false)
        }
    }

    return (
    <div className={style.loginContainer}>
        <Col xs="10" md="4"  className={style.loginCard}>
            <h3 className="text-center">Register</h3>
            <Form onSubmit={handleSubmit}>        
                <Input 
                    onChange={handleChange}
                    label="Name" 
                    id="name"
                    placeHolder="Type your name" />
                <Input 
                    type="email"
                    onChange={handleChange}
                    label="Email" 
                    id="email"
                    placeHolder="Type your email" />
                <Input 
                    onChange={handleChange}
                    type="password"
                    label="Password" 
                    id="password"
                    placeHolder="Type your password" />   
                <Input 
                    onChange={handleChange}
                    type="password"
                    label="Password Confirmation" 
                    id="password_confirmation"
                    placeHolder="Type your password confirmation" />                       
                <div className="d-flex flex-row">
                    <Button 
                        disabled={isLoading}
                        variant="primary" 
                        type="submit" >
                        Submit
                    </Button>      
                    <Link to={LOGIN}>
                        <Button 
                            className="ms-3"
                            variant="danger" 
                            type="submit" >
                            Login
                        </Button>                                  
                    </Link>
                </div>                 
            </Form>
        </Col>
    </div>
    )
}

export default Register