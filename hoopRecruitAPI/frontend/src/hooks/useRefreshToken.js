import React from 'react'
import useAuth from './useAuth'
import axios from '../api/axios';
import { BASE_URL } from '../config';

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        var requestURL = null
        var oauthApp = localStorage.getItem('oauth')
        if (oauthApp != null) {
            requestURL = `/authentication/refresh-${oauthApp}-access-token`
        }
        
        else setAuth(() => { return {} });

        const response = await axios.get(requestURL);
        if (response.status != 200) {
            setAuth(() => { return {} });
        }
        else {
            setAuth(response.data)
        }
        return response?.data?.access;
    }

    return refresh;

}

export default useRefreshToken