import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NewMeeting } from '../pages';

const PrivateRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/new' Component={NewMeeting} />
            </Routes>
        </BrowserRouter>
    )
}

export default PrivateRoutes;