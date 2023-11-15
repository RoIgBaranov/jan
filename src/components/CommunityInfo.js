import React, { useContext, useEffect, useState } from 'react'
import CommunityDataContext from '../Context/CommunityDataContext';
import { useLocation } from 'react-router-dom';
import UserPage from './UserPage';

const CommunityInfo = () => {

    const { communityData, setCommunityData } = useContext(CommunityDataContext);
    const [problems, setProblems] = useState([]);

    const location = useLocation();

    useEffect(() => {
        const communityName = location.pathname.split('/').pop();
        fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/communities/${communityName}/problems`)
            .then(response => response.json())
            .then(data =>{setProblems(data)})

        fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/communities/${communityName}`)
            .then(response => response.json())
            .then(data => {
                setCommunityData(data);
            })
    }, [location.pathname, setCommunityData])
    


    return (
        <div>{communityData &&
            <div>
                <div>
                    {communityData.name}
                </div>
                <div>
                    {communityData.description}
                </div>
                <div style={{display:'flex'}}>
                    <div style={{ height: '20em', width: '20em', backgroundColor: 'rgba(9, 132, 227, 1.00)', borderRadius: '40px', padding: '3em', margin: '10px' }}>
                        <h3>Top Members</h3>
                        <div>{communityData.users.map(user => <UserPage user={user} key={user.email} />)}</div>
                    </div>
                    <div style={{ height: '20em', width: '20em', backgroundColor: 'rgba(9, 132, 227, 1.00)', borderRadius: '40px', padding: '3em', margin: '10px' }}>
                        <h3>Top Problems</h3>
                        <div>{problems.map(problem=> <div>{problem.title}</div>)}</div>
                    </div>
                </div>

            </div>

        }
        </div>
    )
}

export default CommunityInfo