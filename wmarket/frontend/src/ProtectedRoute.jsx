// import React from 'react'
import { Route, Navigate } from "react-router-dom";

/* eslint-disable-next-line react/prop-types, no-unused-vars */
const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
  const role = localStorage.getItem("role");
  return (
    <Route
      {...rest}
      element={(props) => {
        if (!role) {
          return <Navigate to="/login" />;
        }
        if (!role.includes(role)) {
          return <Navigate to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
