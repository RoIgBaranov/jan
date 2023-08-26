import React from 'react'
import "../modelsCSS/buttons/problem-button.css"

const Problem = () => {
  return (
    <div className='problem'>
        <p className='problem-title' style={{marginLeft: '11.2em', maxWidth:'20em'}}>Calculate the perimeter of a rectangle with lenght 12 units and width 8 units</p>
        <p className='problem-author' style={{marginLeft: '15em'}}>award</p>
        <p className='problem-description' style={{marginLeft: '10em'}}>date</p>
        <button className='problemButton' style={{marginLeft: '10em'}}>Solve</button>
        <button className='problemButton' style={{marginLeft: '3em'}}>Donate</button>
    </div>
  )
}

export default Problem