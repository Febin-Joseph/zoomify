import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, JoinMeeting, SignUp, SignIn } from '../pages'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={Home}/>
                <Route path='/join' Component={JoinMeeting}/>
                <Route path='/signin' Component={SignIn}/>
                <Route path='/signup' Component={SignUp}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;