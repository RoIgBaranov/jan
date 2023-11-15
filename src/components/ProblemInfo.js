import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import ProblemContext from '../Context/ProblemContext';
import { dateCalc } from '../utils/dateCalc';
import AuthContext from '../Context/AuthContext';
import Comment from './Comment';
import { handleLocalStorage } from '../utils/handleLocalStorage';
import { Link, useLocation } from 'react-router-dom';



const ProblemInfo = () => {

  const { selectedProblem, setSelectedProblem } = useContext(ProblemContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [comment, setComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const timeDifference = Date.now() - new Date(selectedProblem.dateCreated).getTime();
  let viewTime = dateCalc(timeDifference);
  const [comments, setComments] = useState(selectedProblem.comment || []);
  const location = useLocation();


  useEffect(()=>{
    const problemId = location.pathname.split('/').pop();
    fetch(`https://justanothernobel-cbc6bcd303f9.herokuapp.com/problems/${problemId}`)
    .then(response => response.json())
    .then(data =>setSelectedProblem(data))
  }, [location.pathname, setSelectedProblem])




  const handleComment = () => {
    if (!comment) {
      !isLoggedIn ? setComment(false) : setComment(true)
    } else {
      const newComment = {
        author: user,
        text: commentText,
        date: Date.now()
      }

      setComments([...comments, newComment]);

      const updatedProblem = {
        ...selectedProblem,
        comment: [...comments, newComment],
      };

      setSelectedProblem(updatedProblem);

      handleLocalStorage(comments, newComment, 'comment', selectedProblem);

      setCommentText('')
    }
  }

  const handleLike = () => {
    
  }

  const handleDislike = () => {
    
  }

   return (
    <div>
      
      <div className='problemInfo'>
        <h2>Problem #{selectedProblem.id}</h2>
        <button
          style={!isLoggedIn ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
          onClick={handleLike}><i className="fa fa-thumbs-up fa-lg" aria-hidden="true"></i>{selectedProblem.reactions.likes}
        </button>
        <button
          style={!isLoggedIn ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
          onClick={handleDislike}>
          <i className="fa fa-thumbs-down fa-lg" aria-hidden="true"></i>{selectedProblem.reactions.dislikes}
        </button>
        <div>{`Posted by ${selectedProblem.author}`}</div>
        <div>{` ${Math.floor(viewTime.number)} ${viewTime.text} ago/${selectedProblem.dateCreated.substring(0, 10)}`}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '60%' }}>
          <h2>{selectedProblem.title}</h2>
          <p style={{ wordWrap: 'break-word' }}>{selectedProblem.details}</p>
          <div>
            {comment && <input placeholder='Type your comment...' value={commentText} onChange={(e) => setCommentText(e.target.value)}></input>}
            <button onClick={() => handleComment()}>Send comment</button>
          </div>
          <h4>Propose your solution:</h4>
          {
            isLoggedIn ? <div>
              <textarea style={{ resize: 'none' }}></textarea>
              <button>Submit</button>
              <button>Subscribe</button>
            </div> : 
            <Link to='/login'>
            <button>Log in</button>
            </Link>
            
          }
          {comments.map((item, index) => (
            <Comment key={index} item={item} />
          ))}


        </div>
        <div style={{ width: '30%', display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
          <h3>{`Current award: $ ${selectedProblem.totalAward}`}</h3>
          <p style={{ fontSize: '13px', width: '25%' }}>Please don't hesitate and give us all your money</p>
          <button className='propose-button' style={{ margin: "0" }} >Sponsor</button>
          <h4>Top sponsors:</h4>
          <ul>
            <li>123$ by Roman 10.09.2023</li>
            <li>123$ by Roman 10.09.2023</li>
            <li>123$ by Roman 10.09.2023</li>
            <li>123$ by Roman 10.09.2023</li>
            <li>123$ by Roman 10.09.2023</li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default ProblemInfo