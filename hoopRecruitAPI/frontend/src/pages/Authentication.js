import React from 'react'
import Spotify from '../components/Auth/Spotify'
import Strava from '../components/Auth/Strava'

const Authentication = () => {
    return (
        <div className='container-fluid text-center'>
            <div class="row" style={{ height: '100vh' }}>
                <div class="col-md-4 login-options">
                    <h3 className="text-center text-light fw-bold pt-3 pb-4">Let's start hoopin'</h3>
                    <Spotify />
                    <Strava />
                </div>
                <div class="col-md-8 info">
                    <div className='m-5'>
                        <img className="basketball-rim-img m-5" src="http://svgur.com/i/4N.svg" />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Authentication