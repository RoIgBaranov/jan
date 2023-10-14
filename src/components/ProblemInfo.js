import React, { useState } from 'react'
import { useContext } from 'react';
import ProblemContext from '../Context/ProblemContext';
import { dateCalc, formatDate } from '../utils/dateCalc';
import AuthContext from '../Context/AuthContext';
import ChangePageContext from '../Context/ChangePageContext';
import Comment from './Comment';
import { handleLocalStorage } from '../utils/handleLocalStorage';
import { Link, useParams } from 'react-router-dom';



const ProblemInfo = () => {

  const { selectedProblem, setSelectedProblem } = useContext(ProblemContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const { setCurrentPage } = useContext(ChangePageContext);
  const {problem} = useParams(selectedProblem.title);
  const [comment, setComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const timeDifference = Date.now() - selectedProblem.date;
  let viewTime = dateCalc(timeDifference);
  const formattedDate = formatDate(selectedProblem.date);
  const [comments, setComments] = useState(selectedProblem.comment || []);
  const [like, setLike] = useState(selectedProblem.like || 0);
  const [dislike, setDislike] = useState(selectedProblem.dislike || 0)




  const handleComment = () => {
    if (!comment) {
      !isLoggedIn ? setCurrentPage('login') : setComment(true)
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
    const problemArray = JSON.parse(localStorage.getItem('problemList'));
    const problemIndex = problemArray.findIndex(item => item.title === selectedProblem.title);

    if (problemIndex !== -1) {
      setLike(prevLike => prevLike + 1);
      problemArray[problemIndex].like++;
      localStorage.setItem('problemList', JSON.stringify(problemArray));
    } else {
      console.log('Not found');
    }
  }

  const handleDislike = () => {
    const problemArray = JSON.parse(localStorage.getItem('problemList'));
    const problemIndex = problemArray.findIndex(item => item.title === selectedProblem.title);
    if (problemIndex !== -1) {
      setDislike(prevDislike => prevDislike + 1);
      problemArray[problemIndex].dislike++;
      localStorage.setItem('problemList', JSON.stringify(problemArray));

    } else {
      console.log('Not found');
    }
  }

  return (
    <div>
      <div className='problemInfo'>
        <h2>Problem #</h2>
        <button
          style={!isLoggedIn ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
          onClick={handleLike}><i className="fa fa-thumbs-up fa-lg" aria-hidden="true"></i>{like || ''}
        </button>
        <button
          style={!isLoggedIn ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
          onClick={handleDislike}>
          <i className="fa fa-thumbs-down fa-lg" aria-hidden="true"></i>{dislike || ''}
        </button>
        <div>{`Posted by ${selectedProblem.author.login}`}</div>
        <div>{` ${Math.floor(viewTime.number)} ${viewTime.text} ago/${formattedDate}`}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '60%' }}>
          <h2>{selectedProblem.title}</h2>
          <p style={{ wordWrap: 'break-word' }}>{selectedProblem.text}</p>
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
          <h3>{`Current award: $ ${selectedProblem.award}`}</h3>
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