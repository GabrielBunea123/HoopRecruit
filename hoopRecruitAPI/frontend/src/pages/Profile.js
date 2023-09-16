import React, { useState } from 'react'
import { Button } from '@mui/material'
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DoneIcon from '@mui/icons-material/Done';

const Profile = () => {

    const [targeted, setTargeted] = useState(false)

    return (
        <div className='container'>
            <div className="d-flex flex-wrap justify-content-between pt-5">
                <div className="profile-img-container"></div>
                <div className="team-position-number py-3">
                    <h4 className="p-3 pt-4 pb-2 fw-bold text-light">Kawhi Leonard</h4>
                    <div className="d-flex justify-content-around py-3">
                        <p className="mx-3">LA Clippers</p>
                        <p className="mx-3">Small Forward</p>
                        <p className="mx-3">#2</p>
                    </div>
                    <div className="py-4 my-1">
                        <Button
                            onClick={() => { setTargeted(!targeted) }}
                            startIcon={targeted ? <DoneIcon /> : <TrackChangesIcon />}
                            variant={targeted ? 'contained' : 'outlined'} color="primary"
                            style={{ backgroundColor: targeted && '#ff8501', color: targeted ? 'white' : '#ff8501', borderColor: !targeted && '#ff8501' }}
                            className="mx-3">
                            {targeted ? 'Targeted' : 'Target'}
                        </Button>
                    </div>
                </div>
                <div className="stats-container align-self-center my-3">
                    <div className="stats-name d-flex justify-content-around pt-5 pb-4">
                        <div>PPG</div>
                        <div>REB</div>
                        <div>AST</div>
                        <div>FG%</div>
                    </div>
                    <div className="stats d-flex justify-content-around pb-5">
                        <div>23.8</div>
                        <div>6.5</div>
                        <div>3.9</div>
                        <div>51.2</div>
                    </div>
                </div>
            </div>

            {/* <div className="d-flex justify-content-between p-5">
                <div className="text-center">
                    <div className="basic-player-info-label">Height</div>
                    <div className="basic-player-info-numbers pt-2">2.01m</div>
                    <hr></hr>
                    <div className="basic-player-info-label">Weight</div>
                    <div className="basic-player-info-numbers pt-2">102kg</div>
                </div>
                <div className="text-center">
                    <div className="basic-player-info-label">Country</div>
                    <div className="basic-player-info-numbers pt-2">USA</div>
                    <hr></hr>
                    <div className="basic-player-info-label">Education</div>
                    <div className="basic-player-info-numbers pt-2">San Diego State</div>
                </div>
                <div className="text-center">
                    <div className="basic-player-info-label">Birthdate</div>
                    <div className="basic-player-info-numbers pt-2">June 29, 1991</div>
                    <hr></hr>
                    <div className="basic-player-info-label">Experience</div>
                    <div className="basic-player-info-numbers pt-2">11 years</div>
                </div>
            </div> */}
            <h5 className="fw-bold px-2 pt-5 pb-2 text-light">Highlights</h5>
            <div className="videos-grid py-4 px-2">
                {[0, 1, 2, 3, 4, 5].map((item, index) => (
                    <div className="video stacked">
                        <img src={`../../static/images/${index}.webp`} alt="" class="video__img"></img>
                        <div class="video__content">
                            <h2 class="video__title">Lorem, ipsum dolor.</h2>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Profile