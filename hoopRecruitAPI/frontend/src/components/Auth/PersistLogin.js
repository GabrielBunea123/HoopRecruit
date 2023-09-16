import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'
import ReactLoading from 'react-loading'

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.log(err)
            }
            finally {
                isMounted && setIsLoading(false)
            }
        }
        !auth?.access_token ? verifyRefreshToken() : setIsLoading(false)
        return () => isMounted = false;
    }, [])


    return (
        <>
            {isLoading ?
                <div className="loading">
                    <ReactLoading type="balls" color="#fff" />
                </div>
                :
                <Outlet />
            }
        </>
    )
}

export default PersistLogin