import React from 'react'
import { formatDate } from '../utils/dateCalc';

const Comment = ({ item }) => {
  const formattedDate = formatDate(item.date);

  return (
    <div>
      <h4>{item.author.nickname}:</h4>
      {`${formattedDate} ${item.text}`}
      <button><i className="fa fa-thumbs-up fa-lg" aria-hidden="true"></i></button>
        <button><i className="fa fa-thumbs-down fa-lg" aria-hidden="true"></i></button>
    </div>
  )
}

export default Comment