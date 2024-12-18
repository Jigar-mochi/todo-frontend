import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('accessToken');
    console.log('PublicRoute', PublicRoute);
    

    if (token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;
