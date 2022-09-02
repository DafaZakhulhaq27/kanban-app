import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import style from './login.module.css'
import Form from 'react-bootstrap/Form';
import { Input } from '../../../components';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { HOME, REGISTER } from '../../../navigation/routesName';
import { useForm } from '../../../hooks';
import { axios, errorResponse, toastError } from '../../../config';
import { toast } from 'react-toastify';

const Login = () => {
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
            const response = await axios.post("/auth/login", form);
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
            <h3 className="text-center">Login</h3>
            <Form onSubmit={handleSubmit}>        
                <Input 
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
                <div className="d-flex flex-row">
                    <Button 
                        disabled={isLoading}
                        variant="primary" 
                        type="submit" >
                        Submit
                    </Button>      
                    <Link to={REGISTER}>
                        <Button 
                            className="ms-3"
                            variant="danger" 
                            type="submit" >
                            Register
                        </Button>                                  
                    </Link>
                </div>                 
            </Form>
        </Col>
    </div>
    )
}

export default Login