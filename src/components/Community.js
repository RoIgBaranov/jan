import React from 'react'
import { Link } from 'react-router-dom'
import { useCommunityData } from '../Context/CommunityDataContext'

const Community = ({ item }) => {

  const {setCommunityData} = useCommunityData();

  const handleClick = () => {
    setCommunityData(item);
  }

  return (
    <Link to={`/communities/${item.name}`}>
      <div onClick={handleClick} style={{ width: '10em', height: '10em', backgroundColor: 'rgba(9, 132, 227, 1.00)', borderRadius: '40px', padding: '3em', margin: '10px' }}>
        {item.name}
        <div>
          Problems: {item.problemsCount}
        </div>
        <div>
          Members: {item.usersCount}
        </div>
      </div>
    </Link>

  )
}

export default Community