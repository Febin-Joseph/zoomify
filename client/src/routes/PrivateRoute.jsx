import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    const navigate = useNavigate();

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    navigate('/signin')
                )
            }
        />
    );
};

export default PrivateRoute;