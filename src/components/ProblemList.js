import React, { useContext } from 'react'
import Problem from './Problem'
import "../modelsCSS/buttons/dropdownButton.css"
import "../modelsCSS/buttons/propose-button.css"
import MyContext from '../MyContext'

const ProblemList = () => {

    const {setCurrentPage} = useContext(MyContext);

    return (
        <div style={{ display: "flex", justifyContent: 'center' }}>
            <div className='problem-list' >
                <div style={{ display: 'flex', marginBottom: '1em' }}>
                    <h4 style={{ marginLeft: '11.7rem' }}>Recent Problems</h4>
                    <h4 style={{ marginLeft: '27.7rem' }}>Award</h4>
                    <button className="dropdown-button">&#9660;</button>
                    <h4 style={{ marginLeft: '8.2rem' }}>Date</h4>
                    <button className="dropdown-button">&#9660;</button>
                    <button onClick={()=>setCurrentPage('propose')} className='propose-button' style={{}}>Propose a problem</button>
                </div>
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
                <Problem />
            </div>
        </div>

    )
}

export default ProblemList