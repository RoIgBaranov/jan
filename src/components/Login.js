import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {


    const [loginData, setLoginData] = useState('');
    const [password, setPassowrd] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [forgetPass, setForgetPass] = useState(false);
    const [sent, setSent] = useState(false);
    const { login, setUser, setAuthHeader } = useContext(AuthContext);
    const navigate = useNavigate();

    const chosenEmailRef = useRef();
    useEffect(() => {
        chosenEmailRef.current = email;
    }, [email])

    const handleLogin = () => {
        const tokken = `${loginData}:${password}`
        const encodedTokken = btoa(tokken)
        const basicAuthHeader = `Basic ${encodedTokken}`

        fetch('https://justanothernobel-cbc6bcd303f9.herokuapp.com/profile/signin', {
            method: 'POST',
            headers: {
                'Authorization': basicAuthHeader
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(data => Promise.reject(data.message))
                }

            })
            .then(data => {
                setAuthHeader(basicAuthHeader)
                setUser(data)
                login();
                navigate('/problems')
            })
            .catch(error => {
                console.error('Произошла ошибка:', error);
                setMessage(error);
            })


    }

    const prevEmail = chosenEmailRef.current;

    const sendToEmail = () => {
        setSent(true);
        setForgetPass(false);
    }

    return (
        <div >
            <h2>Log In Form</h2>
            {!forgetPass ?
                <div>
                    <label>Login
                        <input type='text' value={loginData} onChange={(e) => setLoginData(e.target.value.trim())} />
                    </label>
                    <label>Password
                        <input type='password' value={password} onChange={(e) => setPassowrd(e.target.value.trim())}></input>
                    </label>
                    <button onClick={() => handleLogin()}>Log in</button>
                    {sent && <div>We sent a link to your email {prevEmail}</div>}
                </div> :

                <div>
                    <label>Your email</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value.trim())}></input>
                    <button onClick={() => sendToEmail()}>Send to email</button>
                </div>}




            {message && <div>{message}</div>}
            <button onClick={() => setForgetPass(true)}>Have you forgotten the password?</button>
        </div>
    )
}

export default Login