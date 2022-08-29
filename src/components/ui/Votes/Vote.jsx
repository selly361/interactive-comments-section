import React from 'react'
import './vote.styles.scss'
import { ReactComponent as AddIcon } from '../../../assets/images/icon-plus.svg';
import { ReactComponent as MinusIcon } from '../../../assets/images/icon-minus.svg';


const Vote = ({ votes, setComments, comments, id }) => {

  const handleVoteClick = (type) => {
    let copy = comments;
    let foundComment = copy.find(comment => comment.id === id);
    if(type == 'upvote'){
      foundComment.votes += 1
    } else if(type == 'downvote'){
      foundComment.votes -= 1
    }

    localStorage.setItem("comments", JSON.stringify(copy))
    setComments(JSON.parse(localStorage.getItem("comments")))
  }

  return (
    <div className="vote-container">
      <AddIcon className="icon" onClick={() => handleVoteClick('upvote')} />
      <h2>{votes}</h2>
      <MinusIcon className="icon" onClick={() => handleVoteClick('downvote')} />
    </div>
  )
}

export default Vote