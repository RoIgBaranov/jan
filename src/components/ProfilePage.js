import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext';
import avatar from '../images/avatar.png'

const ProfilePage = () => {

  const { user } = useContext(AuthContext);

  return (
    <div >
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img style={{ width: '4em', height: '4em' }} alt='avatar' src={avatar}></img>
          <div>
            <h4>{`${user.nickname} from ${user.location}`}</h4>
            <h4>{`Rating: 120`}</h4>
          </div>
        </div>
        <div>
          <h4>{`Communities: ${user.communities}`}</h4>
          <h4>{`Roles: Editor`}</h4>
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <div>
          <h3>Stats:</h3>
          <div style={{ border: '1px solid', width: '20em', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p>Problem Solved: 3</p>
            <p>Cheked Solutions: 4</p>
            <p>Problems Formulated: 10</p>
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
  )
}

export default ProfilePage