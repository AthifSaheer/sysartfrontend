import {reactLocalStorage} from 'reactjs-localstorage';
import { useHistory } from 'react-router-dom'
import React from 'react'
import axios from 'axios'

import './Navbar.css'

function NavbarX() {
    const history = useHistory()
    
    function logoutFunc() {
        reactLocalStorage.remove('logintoken');
        reactLocalStorage.remove('code');
        history.push('/login')
    }

    return (
        <div className="navbar__main">
    
            <div className="comany_txt">
                <h5>SYSART</h5>
            </div>
            <div className="middle_div"></div>
            <div className="logout_btn">
                <button onClick={logoutFunc}>Logout</button>
            </div>
    
        </div>
    )
}

export default NavbarX
