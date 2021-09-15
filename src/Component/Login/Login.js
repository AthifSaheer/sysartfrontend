import React, {useState, useEffect} from 'react'
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';

import './Login.css'
import Home from '../Home/Home'

axios.defaults.withCredentials = true;
function Login(props) {
    const [email, setEmail] = useState('')
    const [emailRequired, setEmailRequired] = useState(false)
    const [mustBeEmail, setMustBeEmail] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordRequired, setPasswordRequired] = useState(false)

    const [invalidCredentials, setInvalidCredentials] = useState(false)
    
    const [code, setCode] = useState('')
    const [codeRequired, setCodeRequired] = useState(false)
    
    const [serverDown, setServerDown] = useState(false)


    const loginBtn = () => {
        if(email == '' && password == '' && code == '') {
            setEmailRequired(true)
            setPasswordRequired(true)
            setCodeRequired(true)
        } else {
            if(email == '') {
                setEmailRequired(true)
            } else {
                if (email.includes('@')) {
                    setMustBeEmail(false)
                    setEmailRequired(false)
                } else {
                    setMustBeEmail(true)
                }
            }
    
            if(password == '') {
                setPasswordRequired(true)
            }else {
                setPasswordRequired(false)
            }

            if(code == '') {
                setCodeRequired(true)
            }else {
                setCodeRequired(false)
            }
        }

        
        if (email && password && code && email.includes('@')) {
            let loginData = {'email': email, 'password': password, 'code': code};
            
            axios.post('https://sysart.athifsaheer.online/api/v1/login/', loginData)
            .then((res) => {
                console.log('-----------', res.data);
                if (res.data['nouser']) {
                    setInvalidCredentials(true)
                } else {
                    reactLocalStorage.set('logintoken', res.data['key']);
                    reactLocalStorage.set('code', code);
                    props.setComponent("home")
                }
            } )
            .catch(error => setServerDown(true))
        }
    }

    useEffect(() => {
        if(reactLocalStorage.get('logintoken')) {
            props.setComponent("home")
        }
    }, [])

    let serverDownStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginBottom: '10px',
        fontSize: '22px',
    }

    return (
        <div>
            <div className="main-div">
                <div>
                    <div className="login_container">
                        <h1 className="login-text">Log In</h1>
                        
                        {serverDown?
                            <span className="text-danger" style={serverDownStyle}>Server Down!</span>
                        :
                            null
                        }

                        <div className="login-div">

                            {/* Email */}
                            <input type="email" className="form-control username-input" placeholder="Email"
                            value={email} onChange={e => setEmail(e.target.value)} required
                            />
                            
                            {emailRequired?
                                <span className="text-danger">This field is required</span>
                            :
                                null
                            }

                            {mustBeEmail?
                                <span className="text-danger">This field must be an email !</span>
                            :
                                null
                            }

                            <br />
                            <br />

                            {/* Password */}
                            <input type="password" className="form-control password-input" id="exampleInputPassword1" placeholder="Password" 
                            value={password} onChange={e => setPassword(e.target.value)}
                            
                            />
                            {passwordRequired?
                                <span className="text-danger">This field is required</span>
                            :
                                null
                            }

                            <br />
                            <br />

                            <label htmlFor="code">Choose Code:</label>
                            <select name="code" id="code" onChange={e => setCode(e.target.value)} className="input-error">
                                <option value="">-------</option>
                                <option value="sysarta">A</option>
                                <option value="sysartb">B</option>
                            </select>

                            <br />

                            {codeRequired?
                                <span className="text-danger">This field is required</span>
                            :
                                null
                            }
                            <br />
                            
                            {invalidCredentials?
                                <span className="text-danger">Invalid credentials !</span>
                            :
                                null
                            }

                            <button onClick={loginBtn} type="submit" className="login-btn">Login</button>
                            
                            <p className="or_log_signup_txt">or <span style={{ color: '#1890ff' }} onClick={() => props.setComponent("signup")} > register now!</span></p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
