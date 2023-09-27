import React, { useState } from 'react'
import { Button, Chip } from '@mui/material'
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DoneIcon from '@mui/icons-material/Done';

const videos = [
    { cover: '../../static/images/0.webp', description: "The famous Jerry West NBA logo" },
    { cover: '../../static/images/1.webp', description: "LeBron James winning his first title in Miami" },
    { cover: '../../static/images/2.webp', description: "The moment Kobe and LeBron played against each other in the AllStar Game" },
    { cover: '../../static/images/3.webp', description: "Just a Sixer dunkin'" },
    { cover: '../../static/images/4.webp', description: "Derrick Rose winning the MVP trophy, being the youngest to ever do it" },
    { cover: '../../static/images/5.webp', description: "One of the greatest shots in basketball history" },
]

const skills = [
    'Mid Range',
    '3 Pointers',
    'Defense',
    'Pull-up jumpshot',
    'Layup package',
    'Clutch',
    'High IQ',
    'Good Passing'
]

const Profile = () => {

    const [targeted, setTargeted] = useState(false)

    return (
        <div className='container'>
            <div className="profile-header">
                <div className="img-stats">
                    <div className="d-flex justify-content-center">
                        <div className="profile-img-container"></div>
                    </div>
                    <div className="team-position-number">
                        <h4 className="pt-4 fw-bold text-light">Kawhi Leonard</h4>
                        <div className="tpn py-3">
                            <p>LA Clippers</p>
                            <p>Small Forward</p>
                            <p>#2</p>
                        </div>
                        <div className="py-4 my-1">
                            <Button
                                onClick={() => { setTargeted(!targeted) }}
                                startIcon={targeted ? <DoneIcon /> : <TrackChangesIcon />}
                                variant={targeted ? 'contained' : 'outlined'} color="primary"
                                style={{ backgroundColor: targeted && '#ff8501', color: targeted ? 'white' : '#ff8501', borderColor: !targeted && '#ff8501' }}
                            >
                                {targeted ? 'Targeted' : 'Target'}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="stats-container align-self-center">
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

            <div className="profile-card">
                <p className="pb-3">Biography</p>
                <div className="biography__content">
                    <div>
                        <div className="d-flex py-2">
                            <div className="biography__label">TEAM:</div>
                            <div className="ps-3">LA CLIPPERS</div>
                        </div>
                        <div className="d-flex py-2">
                            <div className="biography__label">POSITION:</div>
                            <div className="ps-3">Small Forward</div>
                        </div>
                        <div className="d-flex py-2">
                            <div className="biography__label">HT/WT:</div>
                            <div className="ps-3">6' 7", 225 lbs</div>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex py-2">
                            <div className="biography__label">BIRTHDATE:</div>
                            <div className="ps-3">6/29/1991 (32)</div>
                        </div>
                        <div className="d-flex py-2">
                            <div className="biography__label">EDUCATION:</div>
                            <div className="ps-3">San Diego St</div>
                        </div>
                        <div className="d-flex py-2">
                            <div className="biography__label">STATUS:</div>
                            <div className="ps-3">Game Time Decision</div>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex py-2">
                            <div className="biography__label">EXPERIENCE:</div>
                            <div className="ps-3">10th Season</div>
                        </div>
                        <div className="d-flex py-2">
                            <div className="biography__label">BIRTHPLACE:</div>
                            <div className="ps-3">Los Angeles, CA</div>
                        </div>
                        <div className="d-flex py-2">
                            <div className="biography__label">DRAFT INFO:</div>
                            <div className="ps-3">2011: Rd 1, Pk 15 (IND)</div>
                        </div>
                    </div>
                </div>
            </div>

            <h5 className="fw-bold px-2 pt-5 pb-2 text-light">Highlights</h5>
            <div className="videos-grid py-4 px-2">
                {videos.map((item, index) => (
                    <a className="video stacked" href={'/highlight/' + index}>
                        <img src={item.cover} alt="" class="video__img"></img>
                        <div class="video__content">
                            <h2 class="video__title">{item?.description?.length > 40 ? item?.description?.slice(0, 40) + '...' : item?.description}</h2>
                        </div>
                    </a>
                ))}
            </div>

            <div className="profile-card">
                <p className="pb-3">Skills</p>
                <div className="d-flex flex-wrap pt-0">
                    {skills.length > 0 ? skills?.map((item => (
                        <Chip className="my-2 me-3" label={item} sx={{color:'white', backgroundColor:'#2c2e3b', fontWeight:600}} />
                    )))
                        :
                        <Chip className="me-2 fw-bold text-secondary" label="No skills added" />
                    }
                </div>
            </div>



        </div>
    )
}
export default Profile