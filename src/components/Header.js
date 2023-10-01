import React, { useContext } from 'react'
import icon from '../images/icon.ico'
import ChangePageContext from '../Context/ChangePageContext';
import AuthContext from '../Context/AuthContext';
import { Link } from 'react-router-dom';



const Header = () => {

  const { setCurrentPage } = useContext(ChangePageContext);
  const { isLoggedIn, logout, user } = useContext(AuthContext);

  const handleLogout = () => {

    setCurrentPage('main')
    logout()
  }


  return (
    <header>
      <Link to='/problems'>
        <img className='logo' src={icon} alt='icon' />
      </Link>
      <h1 style={{ color: 'white', fontSize: '16px', fontStyle: 'italic', letterSpacing: '1px' }}>Empowering Curiosity, Inspiring Excellence</h1>
      <div className='headBtns' style={{ display: 'flex', position: "absolute", right: '8em', }}>
        <Link to='/about'>
          <button>About</button>
        </Link>
        <Link to='/communities'>
          <button>Communities</button>
        </Link>

        {isLoggedIn ?
          <div>
            <div onClick={() => setCurrentPage('profile')}>{user.nickname}</div>
            <button onClick={() => handleLogout()}>Log Out</button>
          </div>
          :
          <div>
            <Link to='login'>
              <button onClick={() => setCurrentPage('login')}>Log in</button>
            </Link>
            <Link to='/signup'>
              <button onClick={() => setCurrentPage('signUp')}>Sign up</button>
            </Link>

          </div>}
      </div>

    </header>
  )
}

export default Header