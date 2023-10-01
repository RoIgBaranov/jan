import React from 'react'
import icon from '../images/icon.ico'
import paul from '../images/Paul.jpg'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className='leftFooterContent'>
        <Link to='/problems'>
          <img className='logo' src={icon} alt='icon'></img>
        </Link>
        <h1 style={{ margin: '0', marginLeft: '8em', color: 'white', fontSize: '17px' }}>© 2023 JustAnotherNobel.com</h1>
      </div>
      <div className='rightFooterContent'>
        <h1 style={{ color: 'white', fontSize: '13px' }}>Inspired by <br />Paul Erdős</h1>
        <img src={paul} alt=''></img>
      </div>

    </footer>
  )
}

export default Footer