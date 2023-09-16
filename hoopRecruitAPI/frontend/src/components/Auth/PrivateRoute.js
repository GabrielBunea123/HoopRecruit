import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const PrivateRoute = ({ children }) => {

    const { auth } = useAuth()
    const location = useLocation()


    return auth?.access_token ? children : <Navigate to="/auth" state={{ from: location }} replace />
}

export default PrivateRoute