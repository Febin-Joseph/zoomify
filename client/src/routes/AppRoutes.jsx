import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home, JoinMeeting, SignUp, SignIn, Home2, NewMeeting, Room, PricingPlans } from '../pages';
// import { PageNotFound } from '../pages';

const AppRoutes = () => {
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='join' element={<JoinMeeting />} />
                <Route path='signin' element={<SignIn />} />
                <Route path='signup' element={<SignUp />} />
                <Route path='home' element={<Home2 />} />
                <Route path='new' element={<NewMeeting />} />
                {/* <Route path='*' element={<PageNotFound />} /> */}
                <Route path='room/:roomId' element={<Room />} />
                <Route path='plans' element={<PricingPlans />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
