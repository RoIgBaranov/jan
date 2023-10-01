import React, { useContext, useState } from 'react'
import AuthContext from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {


    const [loginData, setLoginData] = useState('');
    const [password, setPassowrd] = useState('');
    const [message, setMessage] = useState('');
    const [targetPath, setTargetPath] = useState('');
    const { login, setUser } = useContext(AuthContext);


    const handleLogin = () => {

        const userData = {
            login: loginData,
            password: password
        }
        const storedArray = JSON.parse(localStorage.getItem('users'))
        const user = storedArray.find(user => user.nickname === userData.login);
        if (!user) {
            setMessage('User not found')
            setTargetPath('/login')
        } else if (user.password !== userData.password) {
            setMessage('Password is not valid')
            setTargetPath('/login')
        } else {
            setTargetPath('/')
            setUser(user);
            login();
            
        }
        //TODO API request to the server for login


        //Changing global login-state

    }

    return (
        <div >
            <h2>Log In Form</h2>
            <label>Login
                <input type='text' value={loginData} onChange={(e) => setLoginData(e.target.value.trim())} />
            </label>
            <label>Password
                <input type='password' value={password} onChange={(e) => setPassowrd(e.target.value.trim())}></input>
            </label>
            <Link to={targetPath}>
                <button onClick={() => handleLogin()}>Log in</button>
            </Link>
            {message && <div>{message}</div>}
        </div>
    )
}

export default Login