import React, { useEffect, useState } from 'react'
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DenseTable() {
    const [studentData, setStudentData] = useState([])
    const [serverDown, setServerDown] = useState(false)

    useEffect(() => {
        let code = reactLocalStorage.get('code')
        axios.get(`http://127.0.0.1:8000/api/v1/home/${code}/`)
        .then((res) => {
            console.log('----Succes-------', res.data)
            setStudentData(res.data)
        })
        .catch(error => {
            console.log('---Error--------', error.data)
            setServerDown(true)
        })

    }, [])

    const classes = useStyles();

    return (
        <div className="home_main_div">
            {serverDown? 
                <p className="server_down_text_danger">Server Down !</p>
            :
                <div className="main_div">
                    <div className="student_table_start"></div>
                    <div className="student_table">

                        <p>STUDENTS</p>
                        <table style={{ width: '99%'}}>
                            <thead>
                                <tr>
                                    <th>ID</th> 
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            
                            <tbody style={{ textAlign: 'center' }}>
                                {studentData.map((data) => {
                                    return(
                                        <tr key={data.id}>
                                            <td>{data.id}</td> 
                                            <td>{data.name}</td>
                                            <td>{data.age}</td>
                                            <td>{data.gender}</td>
                                            <td>{data.address}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>

  );
}