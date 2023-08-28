// import React, { useEffect } from 'react';
// import { Route, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ path, componenet: Component }) => {
//     const isAuthenticated = useSelector(state => state.auth.token !== null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!isAuthenticated) {
//             navigate('/signin');
//         }
//     }, [isAuthenticated, navigate]);

//     return (
//         <Route
//             path={path}
//             element={isAuthenticated ? <Component /> : null}
//         />
//     );
// };

// export default PrivateRoute;
