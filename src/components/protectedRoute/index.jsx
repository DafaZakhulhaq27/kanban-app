import React from 'react'
import { Navigate } from "react-router-dom";
import { HOME, LOGIN } from '../../navigation/routesName';
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ children, isLogin }) => {
    const dataLogin = localStorage.getItem('token_kanban');

    if(dataLogin){
        const decoded = jwt_decode(dataLogin);
        const currrentTimestamp = Math.floor(Date.now() / 1000) ;
        const expTimestamp = decoded.exp ;

        if(currrentTimestamp > expTimestamp){
            localStorage.clear();
            return <Navigate to={LOGIN} />
        }
    }

    if (isLogin) {
        return dataLogin ? children : <Navigate to={LOGIN} />;
    } else {
        return !dataLogin ? children : <Navigate to={HOME} />;
    }
}

export default ProtectedRoute