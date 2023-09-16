import React, { useContext, useDebugValue } from 'react'
import AuthContext from '../context.js/AuthProvider'

const useAuth = () => {
    const { auth } = useContext(AuthContext)
    useDebugValue(auth, auth => auth?.access_token ? 'Logged in' : 'Logged out')
    return useContext(AuthContext)
}

export default useAuth