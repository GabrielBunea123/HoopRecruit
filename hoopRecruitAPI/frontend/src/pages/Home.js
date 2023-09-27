import React, { useEffect } from 'react'
import { BASE_URL } from '../config'
import useAuth from '../hooks/useAuth'
import useAxios from '../hooks/useAxios'

const Home = () => {

    const { auth, setAuth, logoutUser } = useAuth()
    const api = useAxios()

    const getUsers = async () => {
        await api.get(BASE_URL + '/authentication/get-users')
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                if (err.response.status == 403 || err.response.status == 401) {
                    logoutUser()
                }
            })
    }

    useEffect(() => {
        // getUsers()
    }, [])

    return (
        <div className="container pt-5">
            {/* width="368" height="655" */}
            {/* <video src={`../../static/videos/default.mp4`} width={320} height={240} controls>

            </video> */}

            <div className="text-center">
                {/* <video
                    style={{borderRadius:20}}
                    controls
                    width="85%"
                    // height=""
                    src={`../../static/videos/Ja.mp4`}
                ></video> */}
            </div>
        </div>
    )
}

export default Home