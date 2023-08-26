import React, { useContext } from 'react'
import icon from '../images/icon.ico'
import paul from '../images/Paul.jpg'
import MyContext from '../MyContext'

const Footer = () => {

  const {setCurrentPage} = useContext(MyContext);

  return (
    <footer>
        <div className='leftFooterContent'>
            <img onClick={() => setCurrentPage('main')} className='logo' src={icon} alt='icon'></img>
            <h1 style={{margin: '0', marginLeft:'8em', color: 'white', fontSize: '17px'}}>© 2023 JustAnotherNobel.com</h1>
        </div>
        <div className='rightFooterContent'>
            <h1 style={{color:'white', fontSize: '13px'}}>Inspired by <br/>Paul Erdős</h1>
            <img src={paul} alt=''></img>
        </div>
        
    </footer>
  )
}

export default Footer