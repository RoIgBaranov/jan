import React from 'react'

const UserPage = ({user}) => {
  return (
    <div  style={{height:'5em', width:'5em'}}>{user.nickname}</div>
  )
}

export default UserPage