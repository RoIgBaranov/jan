import React from 'react'

const Login = () => {
    return (
        <div >
            <form className='loginForm' style={{}} onSubmit={(e) => e.preventDefault()}>
                <h2>Log In Form</h2>
                <label>Login</label>
                <input type='text'></input>
                <label>Password</label>
                <input type='password'></input>
                <button>Log in</button>
            </form>
        </div>
    )
}

export default Login