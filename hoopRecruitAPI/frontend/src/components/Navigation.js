import React from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../hooks/useAuth';

const Navigation = () => {

    const { logoutUser } = useAuth()

    return (
        <nav className="navbar-container">
            <div className='navbar-controller'>
                <div className="container">
                    {/* <button type="button">
                    <span class="navbar-toggler-icon"></span>
                </button> */}
                    <div className="d-flex justify-content-between">
                        <a className="p-2 navbar-links" href="/">
                            <div className='fw-bold pt-1'>HoopRecruit</div>
                        </a>
                        <div className="p-2">
                            <TextField
                                variant="outlined"
                                placeholder="Search"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    style: { backgroundColor: 'white', borderRadius: 20, width: 250, height: 30, marginTop: 2, fontSize: 13 },
                                }}
                            />
                        </div>
                        <div className="d-flex p-2">
                            <a href="#" className="p-1 px-3 navbar-links">
                                <i class="fa-solid fa-bell"></i>
                            </a>
                            <a href="#" className="p-1 px-3 navbar-links">
                                <i class="fa-solid fa-gear"></i>
                            </a>
                            {/* <a href="/profile" className="p-1 px-3 navbar-links">
                                <i class="fa-solid fa-user"></i>
                            </a> */}
                            <div class="dropdown">
                                <a class="navbar-links p-1 px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-user"></i>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item py-2" href="#">
                                            <div className="d-flex">
                                                <DashboardIcon/>
                                                <div className="px-4">Dashboard</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item py-2" href="#">
                                            <div className="d-flex">
                                                <SignalCellularAltIcon/>
                                                <div className="px-4">Analytics</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item py-2" href="/profile">
                                            <div className="d-flex">
                                                <PersonIcon/>
                                                <div className="px-4">Profile</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li onClick={logoutUser}>
                                        <a class="dropdown-item py-2 sign-out" href="#">
                                            <div className="d-flex">
                                                <LogoutIcon/>
                                                <div className="px-4">Sign out</div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </nav>
    )
}

export default Navigation