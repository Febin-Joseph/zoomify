import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, JoinMeeting, SignUp, SignIn, Home2, NewMeeting, Room, PricingPlans } from '../pages';
import PrivateRoute from './PrivateRoute';
// import { PageNotFound } from '../pages';

const AppRoutes = () => {
    const isAuthenticated = localStorage.getItem('token') !== null;

    return (
        <BrowserRouter>
            <Routes>
                <Route index path='/' element={<Home />} />
                <Route path='/join' element={<JoinMeeting />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/home' element={<Home2 />} />
                <Route path='/new' element={<NewMeeting />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/room/:roomid/:uid' element={<Room />} />
                <Route path='/plans' element={<PricingPlans />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
