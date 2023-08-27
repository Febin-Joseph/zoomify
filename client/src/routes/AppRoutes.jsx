import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, JoinMeeting, SignUp, SignIn, Home2 } from '../pages';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
    return (
        <BrowserRouter>
        <PrivateRoute path='/new' component={Home2} />
            <Routes>
                <Route path='/' Component={Home} />
                <Route path='/join' Component={JoinMeeting} />
                <Route path='/signin' Component={SignIn} />
                <Route path='/signup' Component={SignUp} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;