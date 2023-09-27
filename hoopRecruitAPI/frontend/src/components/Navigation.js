import React, { useEffect, useRef, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NavDropdown from './NavDropdown';
import { IconButton } from '@mui/material';

const Navigation = () => {

    const togglerRef = useRef(null)
    const [navToggled, setNavToggled] = useState(false)

    const toggleNavbar = () => {
        setNavToggled(!navToggled)
    }

    return (
        <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary navbar-dark">
            <div class="container">
                <a class="fw-bold nav-link pe-2" href="/">HoopRecruit</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="ms-auto my-1 search-bar">
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
                                style: { backgroundColor: 'white', borderRadius: 20, width: "100%", height: 30, marginTop: 2, fontSize: 13 },
                            }}
                        />
                    </div>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item dropstart">
                            <NavDropdown />
                        </li>
                        <li class="nav-item">
                            <a class="nav-link d-flex" aria-current="page" href="#">
                                <i class="fa-solid fa-bell p-1 pe-2"></i>
                                <div className="a-label ps-2" style={{ fontWeight: 600 }}>Notifications</div>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link d-flex" href="#">
                                <i class="fa-solid fa-gear p-1 pe-2"></i>
                                <div className="a-label ps-2" style={{ fontWeight: 600 }}>Settings</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}



export default Navigation