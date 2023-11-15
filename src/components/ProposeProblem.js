import React, { useContext, useEffect, useState } from 'react'
import { BlockMath } from 'react-katex'
import AuthContext from '../Context/AuthContext';

import { getCommunities } from '../utils/getCommunities';


const ProposeProblem = () => {
  const [inputTitle, setInputTitle] = useState('')
  const [inputText, setInputText] = useState('');
  const [communities, setCommunities] = useState([]);
  const { user } = useContext(AuthContext);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };
  const isLaTeX = (text) => {
    return text.includes("$") && text.indexOf("$") !== text.lastIndexOf("$");
  };

  useEffect(() => {
    getCommunities(setCommunities)
  }, [])

  const createProblem = () => {
    const newProblem = {
      title: inputTitle,
      text: inputText,
      date: Date.now(),
      author: user,
      award: 0,
      votes: 0,
      solutions: 0
    }

    const storedArray = JSON.parse(localStorage.getItem('problemList'))
    storedArray.push(newProblem)

    localStorage.setItem('problemList', JSON.stringify(storedArray));


  }


  return (
    <div style={{ display: 'flex', }}>
      <div className='leftContent'>
        <h3>Propose a problem</h3>
        <h4>Title:</h4>
        <textarea value={inputTitle} placeholder='up to 150 char' onChange={(e) => setInputTitle(e.target.value)} maxLength={150} rows={3} cols={60} style={{ resize: 'none' }} type='text' />
        <h4>Description:</h4>
        <textarea value={inputText} placeholder='Rich Text editor. Supports Markdown, LaTeX, etc.' onChange={handleChange} rows={20} cols={70} style={{ resize: 'none' }} />
        <label>Community</label>
        <select>{communities.map((item, index) => <option value={item.name} key={index}>{item.name}</option>)}</select>
        <button onClick={() => createProblem()}>Post the problem</button>

      </div>
      <div className='rightContent' >
        <h3>Problem Preview</h3>
        <h4>{inputTitle}</h4>
        <div style={{ wordWrap: 'break-word' }}>
        {isLaTeX(inputText) ? (
          <MathComponent tex={inputText} display={true} />
        ) : (
          <p>{inputText}</p>
        )}
        </div>

      </div>


    </div>
  )
}

export default ProposeProblem