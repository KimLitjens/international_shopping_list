import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../utils/hooks/useAuth';
import * as ROUTES from '../constants/routes'


export default function PrivateRoute({ children, ...rest }) {
    const userInfo = useAuth();
    const [auth, setAuth] = useState({});

    useEffect(() => {
        setAuth(userInfo);
    }, [userInfo]);

    if (!auth.currentUser) {
        return null;
    }
    console.log(auth.currentUser)
    return (
        Object.keys(auth.currentUser).length ? children : <Navigate to={ROUTES.LOG_IN} />
    )
};




