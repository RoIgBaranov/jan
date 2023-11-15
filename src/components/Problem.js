import React from 'react'
import "../modelsCSS/buttons/problem-button.css"
import { useContext } from 'react';
import ProblemContext from '../Context/ProblemContext';
import { dateCalc } from '../utils/dateCalc'
import { Link } from 'react-router-dom';



const Problem = ({ item }) => {

  const {  setSelectedProblem } = useContext(ProblemContext);

  const timeDifference = Date.now() - new Date(item.dateCreated).getTime();
  let viewTime = dateCalc(timeDifference);





  return (

    <div className='problem'>
      <p className='problem-title' style={{ marginLeft: '11.2em', maxWidth: '20em' }}>{item.title}</p>
      <p className='problem-author' style={{ marginLeft: '15em' }}>{item.totalAward}$</p>
      <p className='problem-description' style={{ marginLeft: '10em' }}>{`By ${item.author} ${Math.floor(viewTime.number)} ${viewTime.text}  ago`}</p>
      <Link to={`/problems/${item.id}`}>
        <button className='problemButton' onClick={() =>setSelectedProblem(item)} style={{ marginLeft: '10em' }}>Probability</button>
      </Link>
      <button className='problemButton' style={{ marginLeft: '3em', width: '10em', pointerEvents: 'none' }}>{item.subscribers.length + ` votes `}{item.solutions.length + ` solutions`}</button>

    </div>

  )
}

export default Problem