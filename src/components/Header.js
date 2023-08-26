import React, { useContext } from 'react'
import icon from '../images/icon.ico'
import MyContext from '../MyContext';


const Header = () => {

  const { setCurrentPage } = useContext(MyContext);

  return (
    <header>
      <img  onClick={()=> setCurrentPage('main')} className='logo' src={icon} alt='icon' />
      <h1 style={{ color: 'white', fontSize: '16px', fontStyle: 'italic', letterSpacing: '1px' }}>Empowering Curiosity, Inspiring Excellence</h1>
      <div className='headBtns' style={{ display: 'flex', position: "absolute", right: '8em', }}>
        <button onClick={() => setCurrentPage('about')}>About</button>
        <button onClick={() => setCurrentPage('communities')}>Communities</button>
        <button  onClick={()=> setCurrentPage('login')}>Log in</button>
        <button  onClick={()=> setCurrentPage('signUp')}>Sign up</button>
      </div>

    </header>
  )
}

export default Header