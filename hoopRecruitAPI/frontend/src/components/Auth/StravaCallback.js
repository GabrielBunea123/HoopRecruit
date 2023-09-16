import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth'
import ReactLoading from 'react-loading'

const StravaCallback = () => {

    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

    const callback = async () => {

        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");

        await axios.get(`/authentication/strava-callback?code=${code}`)
            .then((res) => {
                setAuth(res.data.oauth)
                localStorage.setItem('oauth', res.data.oauth);
                navigate(from)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        callback()
    }, []);



    return (
        <div className="loading">
            <ReactLoading type="balls" color="#fff" />
        </div>
    )
}

export default StravaCallback