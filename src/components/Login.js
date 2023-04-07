import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import '../css/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProfile } from '../redux/action';


const Login = () => {
    //============================
    //     VARIABLES FOR SIGN UP
    //============================
    const [userName, setUserName] = useState({
        value: '',
        isTouched: 'false',
        error: 'Username must be at least 5 characters',
        isValid: 'false'
    })
    const [email, setEmail] = useState({
        value: '',
        isTouched: 'false',
        error: 'Email is not valid',
        isValid: 'false'
    })
    const [password, setPassword] = useState({
        value: '',
        isTouched: 'false',
        error: 'Password is not valid',
        isValid: 'false'
    });
    const [confirmPassword, setConfirmPassword] = useState({
        value: '',
        isTouched: 'false',
        error: 'Password does not match'
    });
    const [mobile, setMobile] = useState({
        value: '',
        isTouched: 'false',
        error: 'Mobile number is not valid',
        isValid: 'false'
    });
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const mobileRegex = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
    //===========================
    //     FUNCTIONS FOR SIGN UP
    //===========================
    const signupUser = async () => {
        if(userName.isValid && email.isValid && password.isValid && password.value === confirmPassword.value && mobile.isValid 
            && userName.value.length && email.value.length && password.value.length && confirmPassword.value.length && mobile.value.length
           ){
            try {
                const { data } = await axios.post("http://kzico.runflare.run/user/signup", {
                    username: userName.value,
                    email: email.value,
                    password: password.value,
                    mobile: mobile.value,
                })
                toast(`${data.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    type: "success"
                });
            } 
            catch (error) {
                toast(`${error.response.data.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    type: "error"
                })
            }
        }

    }

    //===========================
    //     VARIABLES FOR LOGIN
    //===========================
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [loginEmail, setLoginEmail] = useState({
        value: '',
        isTouched: 'false',
        error: 'Email is not valid',
        isValid: 'false'
    })
    const [loginPassword, setLoginPassword] = useState({
        value: '',
        isTouched: 'false',
        error: 'Password is not valid',
        isValid: 'false'
    });
    //===========================
    //     FUNCTIONS FOR LOGIN
    //===========================
    const loginUser = async () => {
        if(loginEmail.isValid && loginPassword.isValid && loginEmail.value.length && loginPassword.value.length){
            try {
                const { data } = await axios.post("http://kzico.runflare.run/user/login", {
                    email: loginEmail.value,
                    password: loginPassword.value,
                })
                localStorage.setItem('token', `${data.user.token}`);
                toast(`${data.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    type: "success"
                });
                dispatch(getProfile());
                navigate('/');
            } catch (error) {
                toast(`${error.response.data.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    type: "error"
                })
            }
        }
    }

    return (
        <div className="login">
            <ToastContainer />
            <Container>
                <Row>
                    <Col md='6'>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <p>Login</p>
                            <p> Welcome back! Sign in to your account.</p>
                            <label for="lemail">email address *</label>
                            <input type="email" name="lemail" id="lemail"
                                onChange={(e) => setLoginEmail(last => { return { ...last, value: e.target.value } })}
                                value={loginEmail.value}
                                onBlur={
                                    () => setLoginEmail((last) => {
                                        return { ...last, isTouched: true, isValid: emailRegex.test(last.value) }
                                    })
                                }
                                onFocus={()=>{
                                    setLoginEmail((last)=>{
                                        return {...last,isTouched:false}
                                    })
                                }}
                            />
                            {!loginEmail.isValid && loginEmail.isTouched && <p style={{ color: '#EA1B25' }}>{loginEmail.error}</p>}
                            <label for="lpass">Password *</label>
                            <input type="password" name="lpass" id="lpass"
                                onChange={(e) => setLoginPassword(last => { return { ...last, value: e.target.value } })}
                                value={loginPassword.value}
                                onBlur={
                                    () => setLoginPassword((last) => {
                                        return { ...last, isTouched: true, isValid: passwordRegex.test(last.value) }
                                    })
                                }
                                onFocus={()=>{
                                    setLoginPassword((last)=>{
                                        return {...last,isTouched:false}
                                    })
                                }}
                            />
                            {!loginPassword.isValid && loginPassword.isTouched && <p style={{ color: '#EA1B25' }}>{loginPassword.error}</p>}
                            <button type="submit" onClick={loginUser}>Login</button>
                        </form>
                    </Col>
                    <Col md='6'>
                        <form className="registerForm" onSubmit={(e) => e.preventDefault()}>
                            <p>Register</p>
                            <p>Create new account.</p>
                            <label for="nam">Username *</label>
                            <input type="text" name="nam" id="nam"
                                onChange={(e) => setUserName(last => { return { ...last, value: e.target.value } })}
                                value={userName.value}
                                onBlur={
                                    () => setUserName((last) => {
                                        return { ...last, isTouched: true, isValid: last.value?.trim().length >= 5 }
                                    })
                                }
                                onFocus={()=>{
                                    setUserName((last)=>{
                                        return {...last,isTouched:false}
                                    })
                                }}
                            />
                            {!userName.isValid && userName.isTouched && <p style={{ color: '#EA1B25' }}>{userName.error}</p>}
                            <label for="email">Email *</label>
                            <input type="email" name="email" id="email"
                                onChange={(e) => setEmail(last => { return { ...last, value: e.target.value } })}
                                value={email.value}
                                onBlur={
                                    () => setEmail((last) => {
                                        return { ...last, isTouched: true, isValid: emailRegex.test(last.value) }
                                    })
                                }
                                onFocus={()=>{
                                    setEmail((last)=>{
                                        return {...last,isTouched:false}
                                    })
                                }}
                            />
                            {!email.isValid && email.isTouched && <p style={{ color: '#EA1B25' }}>{email.error}</p>}
                            <label for="pass">Password *</label>
                            <input type="password" name="pass" id="pass"
                                onChange={(e) => setPassword(last => { return { ...last, value: e.target.value } })}
                                value={password.value}
                                onBlur={
                                    () => setPassword((last) => {
                                        return { ...last, isTouched: true, isValid: passwordRegex.test(last.value) }
                                    })
                                }
                                onFocus={()=>{
                                    setPassword((last)=>{
                                        return {...last,isTouched:false}
                                    })
                                }}
                            />
                            {!password.isValid && password.isTouched && <p style={{ color: '#EA1B25' }}>{password.error}</p>}
                            <label for="ConfirmPass">Confirm password *</label>
                            <input type="password" name="ConfirmPass" id="ConfirmPass"
                                onChange={(e) => setConfirmPassword(last => { return { ...last, value: e.target.value } })}
                                value={confirmPassword.value}
                                onBlur={
                                    () => setConfirmPassword((last) => {
                                        return { ...last, isTouched: true }
                                    })
                                }
                                onFocus={()=>{
                                    setConfirmPassword((last)=>{
                                        return {...last,isTouched:false}
                                    })
                                }}
                            />
                            {confirmPassword.value !== password.value && confirmPassword.isTouched ? <p style={{ color: '#EA1B25' }}>{confirmPassword.error}</p> : ""}
                            <label for="mobile">Mobile *</label>
                            <input type="text" name="mobile" id="mobile"
                                onChange={(e) => setMobile(last => { return { ...last, value: e.target.value } })}
                                value={mobile.value}
                                onBlur={
                                    () => setMobile((last) => {
                                        return { ...last, isTouched: true, isValid: mobileRegex.test(last.value) }
                                    })
                                }
                                onFocus={()=>{
                                    setMobile((last)=>{
                                        return {...last,isTouched:false}
                                    })
                                }}
                            />
                            {!mobile.isValid && mobile.isTouched && <p style={{ color: '#EA1B25' }}>{mobile.error}</p>}
                            <button type="submit" onClick={signupUser}>Register</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Login;