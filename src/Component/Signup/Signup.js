import React, {useState, useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom'
import * as Yup from 'yup';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';

import '../Login/Login.css'

const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    confirmPassword: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    // email: Yup.string().email('Invalid email').required('Required'),
  });

function Login() {
    const [email, setEmail] = useState('')
    const [emailRequired, setEmailRequired] = useState(false)
    const [mustBeEmail, setMustBeEmail] = useState(false)

    const [username, setUsername] = useState('')
    const [usernameRequired, setUsernameRequired] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordRequired, setPasswordRequired] = useState(false)

    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordRequired, setConfirmPasswordRequired] = useState(false)

    const [pwordDidNotMatch, setPwordDidNotMatch] = useState(false)
    
    const [code, setCode] = useState('')
    const [codeRequired, setCodeRequired] = useState(false)

    const [serverDown, setServerDown] = useState(false)

    const [isValid, setIsValid] = useState(true)
    const [invalidUnamePwrd, setInvalidUnamePwrd] = useState(false)

    const history = useHistory()

    const loginBtn = () => {
        console.log('Login working')
        if(email == '') {
            setIsValid(true)
        } else if(password == '') {
            setIsValid(true)
        }else {
            // axios.post('http://127.0.0.1:8000/login', {username, password})
            // .then(resp => {
            //     if (resp.token == undefined) {
            //         setInvalidUnamePwrd(true)
            //     } else {
            //         setToken('mytoken', resp.token)
            //     }
            // }) // console.log(resp)
            // .catch(error => console.log(error))
        }
    }

    const registerBtn = () => {
        if(email == '' && password == '' && confirmPassword == '') {
            setEmailRequired(true)
            setPasswordRequired(true)
            setConfirmPasswordRequired(true)
            setUsernameRequired(true)
            setCodeRequired(true)
        } else {
            if(username == '') {
                setUsernameRequired(true)
            } else {
                setUsernameRequired(false)
            }

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

            if(confirmPassword == '') {
                setPasswordRequired(true)
            }else {
                setPasswordRequired(false)
            }

            if(password != confirmPassword) {
                console.log("password:", password)
                console.log("confirmPassword:", confirmPassword)
                setPwordDidNotMatch(true)
            } else {
                setPwordDidNotMatch(false)
            }

            if(code == '') {
                setCodeRequired(true)
            } else {
                setCodeRequired(false)
            }
        }

        
        if (username && email && password && password && code && password == confirmPassword &&  email.includes('@')) {
            let signupData = {'username': username, 'email': email, 'password': password, 'code': code};

            axios.post('http://127.0.0.1:8000/register/account/', signupData)
            .then((res) => {
                reactLocalStorage.set('logintoken', res.data['key']);
                reactLocalStorage.set('code', code);
                history.push('/')
            } )
            .catch(error => setServerDown(true))
        }
        
    }

    useEffect(() => {
        if(reactLocalStorage.get('logintoken')) {
            history.push('/')
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
                        <h1 className="login-text">Sign Up</h1>

                        {serverDown?
                            <span className="text-danger" style={serverDownStyle}>Server Down!</span>
                        :
                            null
                        }

                        <div className="login-div">
                            {/* Username */}
                            <input type="text" name="username" className="form-control username-input" placeholder="Username"
                            value={username} onChange={e => setUsername(e.target.value)}
                            />
                            {usernameRequired?
                                <span className="text-danger">This field is required</span>
                            :
                                null
                            }

                            <br />
                            <br />

                            <input type="email" name="email" className="form-control username-input" placeholder="Email"
                            value={email} onChange={e => setEmail(e.target.value)}
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
                            <input type="password" name="password" className="form-control password-input" id="exampleInputPassword1" placeholder="Password" 
                            value={password} onChange={e => setPassword(e.target.value)}
                            
                            />
                            {passwordRequired?
                                <span className="text-danger">This field is required</span>
                            :
                                null
                            }

                            <br />
                            <br />

                            {/* Confirm Password */}
                            
                            <input type="password" name="confirmPassword" className="form-control password-input" id="exampleInputPassword2" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

                            {confirmPasswordRequired?
                                <span className="text-danger">This field is required</span>
                            :
                                null
                            }

                            {invalidUnamePwrd?
                                <span className="text-danger">Invalid username or password!</span>
                                :
                                null
                            }

                            {pwordDidNotMatch?
                                <span className="text-danger">Password did not match!</span>
                            :
                                null
                            }

                            <br />
                            <br />

                            <label htmlFor="code">Choose Code:</label>
                            <select name="code" id="code" onChange={e => setCode(e.target.value)} className="input-error">
                                <option value="">-----------</option>
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

                            {/* Login/Register Button */}
                            <button onClick={registerBtn} type="submit" className="login-btn">Register</button>

                            <Link to='/login' ><p>or <span style={{ color: '#1890ff'}}> login now!</span></p></Link>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
