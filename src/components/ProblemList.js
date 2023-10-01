import React, { useContext, useState } from 'react'
import Problem from './Problem'
import "../modelsCSS/buttons/dropdownButton.css"
import "../modelsCSS/buttons/propose-button.css"
import { Link } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'

const ProblemList = () => {

    const { isLoggedIn } = useContext(AuthContext);

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 10;
    let targetPath = isLoggedIn ? '/propose' : '/login';

    
    //temporary solution without API


    if (!localStorage.getItem('problemList')) {
        localStorage.setItem('problemList', JSON.stringify([]));
    }

    const problemList = JSON.parse(localStorage.getItem('problemList'));



    const visibleItems = problemList.slice(startIndex, startIndex + itemsPerPage);

    const nextItems = () => {
        setStartIndex(prev => Math.min(prev + itemsPerPage, problemList.length - itemsPerPage));
    };

    const prevItems = () => {
        setStartIndex(prev => Math.max(prev - itemsPerPage, 0));
    };




    return (
        <div>
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <div className='problem-list' >
                    <div style={{ display: 'flex', marginBottom: '1em' }}>
                        <h4 style={{ marginLeft: '11.7rem' }}>Recent Problems</h4>
                        <h4 style={{ marginLeft: '27.7rem' }}>Award</h4>
                        <button className="dropdown-button">&#9660;</button>
                        <h4 style={{ marginLeft: '8.2rem' }}>Date</h4>
                        <button className="dropdown-button">&#9660;</button>
                        <Link  to={targetPath}>
                            <button className='propose-button' style={{}}>Propose a problem</button>
                        </Link>
                    </div>
                    <div>
                        {
                            visibleItems.map(item => <Problem key={item.title} item={item} />)
                        }
                        <button onClick={prevItems} disabled={startIndex === 0}>Previous problems</button>
                        <button onClick={nextItems} disabled={startIndex >= problemList.length - itemsPerPage}>Next problems</button>
                    </div>

                </div>

            </div>

        </div>


    )
}

export default ProblemList