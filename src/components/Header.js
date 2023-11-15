import React, { useContext } from 'react'
import icon from '../images/icon.ico'
import noname from '../images/noname.jpg'
import AuthContext from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';



const Header = () => {

  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleProfile = () => {
    navigate(`/profile/${user.email}`);
  };


  return (
    <header>
      <Link to='/problems'>
        <img className='logo' src={icon} alt='icon' />
      </Link>
      <h1 style={{ color: 'white', fontSize: '16px', fontStyle: 'italic', letterSpacing: '1px' }}>Empowering Curiosity, Inspiring Excellence</h1>
      <div className='headBtns' style={{ display: 'flex', position: "absolute", right: '8em', }}>
        <Link to='/about'>
          <button > About</button>
        </Link>
        <Link to='/communities'>
          <button>Communities</button>
        </Link>

        {isLoggedIn ?
          <div style={{ display: 'flex' }}>
            <Link to={`/profile/${user.email}`}>
              <div onClick={handleProfile}>
                <div >{user.nickname}</div>
                <img style={{ height: '3em' }} alt='noname' src={noname}></img>
              </div>
            </Link>
            <div>
              <Link to='login'>
                <button onClick={() => logout()}>Log Out</button>
              </Link>
            </div>
          </div>
          :
          <div>
            <Link to='login'>
              <button >Log in</button>
            </Link>
            <Link to='/signup'>
              <button >Sign up</button>
            </Link>

          </div>}
      </div>

    </header>
  )
}

export default Header