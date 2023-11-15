import React, { useEffect, useState } from 'react'
import avatar from '../images/avatar.png'
import { useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const ProfilePage = () => {

  const location = useLocation();
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState();


  useEffect(() => {

    const profileId = location.pathname.split('/').pop();
    fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/profile/${profileId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(data => Promise.reject(data.message))
        }

      })
      .then(data => setUserData(data))
      .catch(error => {
        console.error('Произошла ошибка:', error)
        setMessage('User not found')
      });

  }, [location.pathname])

  return (
    <div >
      <div>
        {
          !userData ? <div><div>{message}</div><LoadingSpinner /></div> :
            <div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <img style={{ width: '4em', height: '4em' }} alt='avatar' src={avatar}></img>
                  <div>
                    <h4>{`${userData.nickname} from ${userData.location.country}, ${userData.location.city}`}</h4>
                    <h4>{`Rating: ${userData.stats.rating}`}</h4>
                  </div>
                </div>
                <div>
                  <h4>{`Communities: ${userData.communities}`}</h4>
                  <h4>{`Roles: ${userData.roles.join(', ')}`}</h4>
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div>
                  <h3>Stats:</h3>
                  <div style={{ border: '1px solid', width: '20em', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p>{`Problem Solved: ${userData.stats.solvedProblems}`}</p>
                    <p>{`Cheked Solutions:  ${userData.stats.checkedSolutions}`}</p>
                    <p>{`Problems Formulated:  ${userData.stats.formulatedProblems}`}</p>
                  </div>
                </div>
                <div>
                  <h3>Top Posts (Solutions & New Problems) By Score</h3>
                  <div style={{ border: '1px solid', width: '20em', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p>S 51 Solution for the porblem 42</p>
                    <p>P 42 New Problem Statement</p>
                    <p>P 30 New Problem Statement</p>
                    <p>S 20 New Solution Proposed</p>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>



    </div>
  )
}

export default ProfilePage