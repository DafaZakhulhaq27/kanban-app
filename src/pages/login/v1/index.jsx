import React from 'react'
import Col from 'react-bootstrap/Col'
import style from './login.module.css'
import Form from 'react-bootstrap/Form';
import { Input } from '../../../components';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { REGISTER } from '../../../navigation/routesName';

const Login = () => {
  return (
    <div className={style.loginContainer}>
        <Col xs="10" md="4"  className={style.loginCard}>
            <h3 className="text-center">Login</h3>
            <Form>        
                <Input 
                    label="Email" 
                    id="email"
                    placeHolder="Type your email" />
                <Input 
                    type="password"
                    label="Password" 
                    id="password"
                    placeHolder="Type your password" />   
                <div className="d-flex flex-row">
                    <Button 
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