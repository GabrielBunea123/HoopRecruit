import React, { createContext, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    const logoutUser = async () =>{
        await axios.get('/authentication/logout')
        .then(res=>{
            setAuth({})
        })
    }
    
    return (
        <AuthContext.Provider value={{ auth, setAuth, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
