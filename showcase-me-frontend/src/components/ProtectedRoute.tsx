import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
    isAuthenticated: boolean;
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<Props> = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
