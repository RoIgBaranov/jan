import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext';
import { getCommunities } from '../utils/getCommunities';
import MathJax from 'react-mathjax';
import { useNavigate } from 'react-router-dom';



const ProposeProblem = () => {
  const [inputTitle, setInputTitle] = useState('')
  const [inputText, setInputText] = useState('');
  const [communities, setCommunities] = useState([]);
  const { user, authHeader } = useContext(AuthContext);
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [userCommunities, setUserCommunities] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputText(event.target.value);
  };


  useEffect(() => {
    getCommunities(setCommunities)
  }, [])

  const createProblem = () => {
    const newProblem = {
      title: inputTitle,
      details: inputText,
      communities: [...userCommunities]
    }
    fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/problems/add`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProblem)
    })
    .then(response => response.json())
    .then(data => navigate(`/problems/${data.id}`))
  }

  const handleAddCommunity = () => {
    if (selectedCommunity) {
      setUserCommunities([...userCommunities, selectedCommunity]);
      setSelectedCommunity('');

    }
  }
  const handleRemoveCommunity = (itemToRemove) => {
    const duplicate = userCommunities.filter(item => item !== itemToRemove);
    setUserCommunities(duplicate)
  }


  return (
    <div style={{ display: 'flex', }}>
      <div className='leftContent'>
        <h3>Propose a problem</h3>
        <h4>Title:</h4>
        <textarea value={inputTitle} placeholder='up to 150 char' onChange={(e) => setInputTitle(e.target.value)} maxLength={150} rows={3} cols={60} style={{ resize: 'none' }} type='text' />
        <h4>Description:</h4>
        <textarea value={inputText} placeholder='Rich Text editor. Supports Markdown, LaTeX, etc.' onChange={handleChange} rows={20} cols={70} style={{ whiteSpace: 'pre-wrap', resize: 'none' }} />
        <label>Community</label>
        <select onChange={(e) => setSelectedCommunity(e.target.value)}>{communities
          .filter(item => !userCommunities.includes(item.name))
          .map((item, index) => <option value={item.name} key={index}>{item.name} </option>)}</select>
        <button onClick={handleAddCommunity}>Add</button>
        <ul>{userCommunities.map((item, index) => <div key={index}><li>{item}</li><button onClick={() => handleRemoveCommunity(item)}>X</button></div>)}</ul>
        <button onClick={() => createProblem()}>Post the problem</button>

      </div>
      <div className='rightContent' >
        <h3>Problem Preview</h3>
        <h4>{inputTitle}</h4>
        <div style={{ wordWrap: 'break-word' }}>
          <MathJax.Provider >
            <MathJax.Node formula={inputText} />
          </MathJax.Provider>
        </div>

      </div>


    </div>
  )
}

export default ProposeProblem