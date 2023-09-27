import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../hooks/useAuth';

const NavDropdown = () => {

    const { logoutUser } = useAuth()

    return (
        <div class="dropdown">
            <a class="nav-link d-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-user p-1 pe-2"></i>
                <div className="a-label ps-2" style={{fontWeight:600}}>Profile</div>
            </a>
            <ul class="dropdown-menu">
                <li>
                    <a class="dropdown-item py-2" href="#">
                        <div className="d-flex">
                            <DashboardIcon />
                            <div className="px-4 text-dark">Dashboard</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="dropdown-item py-2" href="/profile">
                        <div className="d-flex">
                            <PersonIcon />
                            <div className="px-4">Profile</div>
                        </div>
                    </a>
                </li>
                <li onClick={logoutUser}>
                    <a class="dropdown-item py-2 sign-out" href="#">
                        <div className="d-flex">
                            <LogoutIcon />
                            <div className="px-4">Sign out</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default NavDropdown