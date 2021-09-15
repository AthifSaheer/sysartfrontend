import React, { useEffect, useState } from 'react'
import {reactLocalStorage} from 'reactjs-localstorage';
import { useHistory } from 'react-router-dom'

import Navbar from '../Navbar/Navbar'
import Table from '../Table/Table'
import './Home.css'

function Home() {
    const history = useHistory()

    useEffect(() => {
        if(!reactLocalStorage.get('logintoken')) {
            history.push('/login')
        }

    }, [])

    return (
        <div>
            <Navbar />
            
            <Table />

        </div>
    )
}

export default Home
