import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        return <Navigate to="/signIn" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;