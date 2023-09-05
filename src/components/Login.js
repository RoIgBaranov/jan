import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext';

const Login = () => {

    const {login}  = useContext(AuthContext);

    return (
        <div >
            <h2>Log In Form</h2>
            <label>Login
                <input type='text' />
            </label>
            <label>Password
                <input type='password'></input>
            </label>
            <button onClick={() => login()}>Log in</button>
        </div>
    )
}

export default Login