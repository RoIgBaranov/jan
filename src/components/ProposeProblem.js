import React, { useState } from 'react'
import { BlockMath } from 'react-katex'


const ProposeProblem = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  }


  
  return (
    <div style={{display:'flex', }}>
      <div className='leftContent'>
        <h3>Propose a problem</h3>
        <h4>Title:</h4>
        <textarea placeholder='up to 150 char' maxLength={150} rows={3} cols={60} style={{resize:'none'}} type='text'/>
        <h4>Description:</h4>
        <textarea value={inputText} placeholder='Rich Text editor. Supports Markdown, LaTeX, etc.' onChange={handleInputChange}  rows={20} cols={70} style={{resize:'none'}}/>
      </div>
      <div className='rightContent' >
        <h3>Problem Preview</h3>
        <div>
          {/* Почему дублируется текст? */}
        <BlockMath>{inputText}</BlockMath>
        </div>
        
      </div>

    </div>
  )
}

export default ProposeProblem