import React, { useEffect, useState } from 'react'
import {reactLocalStorage} from 'reactjs-localstorage';
import { useHistory } from 'react-router-dom'

import Navbar from '../Navbar/Navbar'
import Table from '../Table/Table'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

import './Home.css'

function Home() {
    const [component, setComponent] = useState("home")
    const history = useHistory()

    useEffect(() => {
        if(!reactLocalStorage.get('logintoken')) {
            setComponent("login")
        }
    }, [])

    return (
        <div>
            {component == "home"?
                <div>
                    <Navbar setComponent={setComponent} />
                    <Table />
                </div>
            :
                component == "login"?
                    <Login setComponent={setComponent} />
                :
                    component == "signup"?
                        <Signup setComponent={setComponent} />
                    :
                        null
            }
        </div>
    )
}

export default Home
